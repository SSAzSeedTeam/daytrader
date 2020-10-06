import subprocess
import sys
import time
import os
from tempfile import mkstemp
from shutil import move
# sys.path.append("D:\\Vagrant-Projects\\data\\aws_scripts") 
from eks import eks_parm
from command import cmd_exec


#=======================================
#	Variables
#=======================================
step=0
vpc_output=False
node_output=False
aws_values={}

#=======================================
#	Functions
#=======================================
def usage():
	print("")
	print("python eks_ops.py steps|delete|install [[From step] [To step] [--profile aws_profile_name]]")
	print("version: {}".format(eks_parm.version))
	print("")
	print("  --profile = Specify the aws profile to use for deployment")
	print("")
	print("  Install Steps:")
	print("   0. Create VPC")
	print("   1. Create EKS Cluster")
	print("   2. Configure kubectl")
	print("   3. Create worker nodes")
	print("   4. Pull aws-auth ConfigMap")
	print("   5. Update aws-auth and add nodes to cluster")
	print("   6. Patch aws-auth to grant secondary user access to EKS cluster")
	print("")
	print("  Delete Steps:")
	print("   0. Delete Worker Node Stack")
	print("   1. Delete EKS Cluster")
	print("   2. Delete VPC Stack")
	print("")

def install_eks(step, stepto):
	global vpc_output,node_output
	if stepto == 0:
		stepto = 6
	print(eks_parm.divider)
	print("Starting installation of EKS from step {0} to step {1}".format(step,stepto))	
	
	print(eks_parm.divider)
	#sys.exit()
	if step == 0:
		rc = cmd_exec.execute_command_with_status("aws cloudformation create-stack --stack-name {0} --template-url {1}".format(eks_parm.VPC_STACK_NAME,eks_parm.VPC_TEMPLATE), False,
			"aws cloudformation describe-stacks --stack-name {0} --query Stacks[0].StackStatus".format(eks_parm.VPC_STACK_NAME),"\"CREATE_COMPLETE\"")

		if stepto == 0:
			sys.exit()
		step=step+1

	if vpc_output == False and step >= 1:
		cmd_exec.get_outputs("aws cloudformation describe-stacks --stack-name {0} --query Stacks[].Outputs[].[OutputKey,OutputValue] --output text".format(eks_parm.VPC_STACK_NAME),"\t")
		vpc_output=True

	if step == 1:
		#sys.exit()
		rc = cmd_exec.execute_command_with_status("aws eks create-cluster --name {0} --role-arn {1} --resources-vpc-config {2}".format(eks_parm.EKS_CLUSTER_NAME, eks_parm.EKS_ROLE_ARN, 
			"subnetIds={0},securityGroupIds={1}".format(cmd_exec.aws_values["SubnetIds"],cmd_exec.aws_values["SecurityGroups"])), False,
			"aws eks describe-cluster --name {0} --query cluster.status".format(eks_parm.EKS_CLUSTER_NAME),
			"\"ACTIVE\"")

		if stepto == 1:
			sys.exit()

		step=step+1

	if step == 2:
		rc = cmd_exec.execute_command("aws eks update-kubeconfig --name {}".format(eks_parm.EKS_CLUSTER_NAME),False)

		if stepto == 2:
			sys.exit()

		step=step+1

	if step == 3:

		#Check Desired vs Min and Max
		if int(eks_parm.EKS_NODE_AS_GROUP_DESIRED) < int(eks_parm.EKS_NODE_AS_GROUP_MIN) or \
			int(eks_parm.EKS_NODE_AS_GROUP_DESIRED) > int(eks_parm.EKS_NODE_AS_GROUP_MAX):
			cmd_exec.onError("Autoscaling Group Desired size outside Min/Max",1)

		#Build Worker Node Command
		command="aws cloudformation create-stack --stack-name {0} --template-url {1} --parameters \
ParameterKey=ClusterName,ParameterValue={2} ParameterKey=ClusterControlPlaneSecurityGroup,ParameterValue={3} \
ParameterKey=NodeGroupName,ParameterValue={4} ParameterKey=NodeAutoScalingGroupMinSize,ParameterValue={5} \
ParameterKey=NodeAutoScalingGroupMaxSize,ParameterValue={6} ParameterKey=NodeInstanceType,ParameterValue={7} \
ParameterKey=NodeImageId,ParameterValue={8} ParameterKey=KeyName,ParameterValue={9} \
ParameterKey=VpcId,ParameterValue={10} ParameterKey=Subnets,ParameterValue=\'{11}\' \
ParameterKey=NodeVolumeSize,ParameterValue={12} ParameterKey=NodeAutoScalingGroupDesiredCapacity,ParameterValue={13} \
 --capabilities CAPABILITY_IAM".format(eks_parm.EKS_NODES_STACK_NAME, eks_parm.EKS_NODES_TEMPLATE, 
eks_parm.EKS_CLUSTER_NAME, cmd_exec.aws_values["SecurityGroups"],
eks_parm.EKS_NODE_GROUP_NAME, eks_parm.EKS_NODE_AS_GROUP_MIN,
eks_parm.EKS_NODE_AS_GROUP_MAX, eks_parm.EKS_NODE_INSTANCE_TYPE,
eks_parm.EKS_IMAGE_ID, eks_parm.EKS_KEY_NAME,
cmd_exec.aws_values["VpcId"], cmd_exec.aws_values["SubnetIds"].replace(",","\,"),
eks_parm.EKS_NODE_VOLUME_SIZE, eks_parm.EKS_NODE_AS_GROUP_DESIRED
)

		#execute command
		rc = cmd_exec.execute_command_with_status(command,False,
			"aws cloudformation describe-stacks --stack-name {0} --query Stacks[0].StackStatus".format(eks_parm.EKS_NODES_STACK_NAME),"\"CREATE_COMPLETE\"")

		if stepto == 3:
			sys.exit()

		step=step+1

	if step == 4:
		cmd_exec.execute_command("curl -O https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/aws-auth-cm.yaml", False)

		if stepto == 4:
			sys.exit()

		step=step+1


	if node_output == False and step >= 4:	
		cmd_exec.get_outputs("aws cloudformation describe-stacks --stack-name {0} --query Stacks[].Outputs[].[OutputKey,OutputValue] --output text".format(eks_parm.EKS_NODES_STACK_NAME),"\t")

	if step == 5:
		cmd_exec.replace("./aws-auth-cm.yaml","    - rolearn: <ARN of instance role (not instance profile)>","    - rolearn: {0}".format(cmd_exec.aws_values["NodeInstanceRole"]))
		cmd_exec.execute_command("kubectl apply -f aws-auth-cm.yaml", False)

		if stepto == 5:
			sys.exit()

		step=step+1

	try:
		AWS_SEC_ARN=eks_parm.AWS_SECOND_USER_ARN
		AWS_SEC_NAME=eks_parm.AWS_SECOND_USER_NAME
	except AttributeError:
		AWS_SEC_ARN=""
		AWS_SEC_NAME=""

	if step == 6 and len(AWS_SEC_ARN) > 3 and len(AWS_SEC_NAME) >= 1:
		cmd_exec.execute_command("kubectl get -n kube-system configmap/aws-auth -o yaml > aws-auth-patch.yaml", False)
		cmd_exec.insert_lines("./aws-auth-patch.yaml", "kind: ConfigMap",["    - rolearn: {}".format(eks_parm.AWS_SECOND_USER_ARN), \
				"      username: {}".format(eks_parm.AWS_SECOND_USER_NAME), \
				"      groups:", \
				"        - system:masters"])
		cmd_exec.execute_command("kubectl apply -n kube-system -f aws-auth-patch.yaml",False)
	else:
		print("Skipping step 6 as incomplete secondary user credentials supplied in parameters file")


def delete_eks(step,stepto):

	if stepto == 0:
		stepto = 6

	print("Deleting from step {0} to step {1}".format(step,stepto))

	if step == 0:
		print("I am Start {}".format(step))
		cmd_exec.execute_command_with_status("aws cloudformation delete-stack --stack-name {} ".format(eks_parm.EKS_NODES_STACK_NAME), False, \
		"aws cloudformation describe-stacks --stack-name {} --query Stacks[0].StackStatus 2>&1 | grep -c \"does not exist\"".format(eks_parm.EKS_NODES_STACK_NAME), \
		"1")

		if stepto == 0:
			print("I am Stop {}".format(stepto))
			sys.exit()

		step=step+1

	if step == 1:
		print("I am Start {}".format(step))
		cmd_exec.execute_command_with_status("aws eks delete-cluster --name {} ".format(eks_parm.EKS_CLUSTER_NAME), True, \
		"aws eks describe-cluster --name {0} --query cluster.status 2>&1 | grep -c \"No cluster found\"".format(eks_parm.EKS_CLUSTER_NAME), \
		"1")

		if stepto == 1:
			print("I am  Stop {}".format(stepto))
			sys.exit()

		step=step+1

	if step == 2:
		print("I am Start {}".format(step))

		cmd_exec.execute_command_with_status("aws cloudformation delete-stack --stack-name {} ".format(eks_parm.VPC_STACK_NAME), False, \
		"aws cloudformation describe-stacks --stack-name {} --query Stacks[0].StackStatus 2>&1 | grep -c \"does not exist\"".format(eks_parm.VPC_STACK_NAME), \
		"1")

		if stepto == 2:
			print("I am  Stop {}".format(stepto))
			sys.exit()

		step=step+1

def setAwsProfile(profile):
    os.environ['AWS_DEFAULT_PROFILE'] = profile
    print("AWS_DEFAULT_PROFILE set to : {}".format(os.environ['AWS_DEFAULT_PROFILE']))

