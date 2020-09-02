import boto3
import subprocess
import sys
import json


pipeline = boto3.client('codepipeline')
s3_bucket = boto3.resource('s3')

def exec_cmd(command):
    p=subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        print(line)

def add(event, context):
    print ("printing from ss-poc-lambda-2")

    exec_cmd('mkdir -v /tmp/code/')

    response = s3_bucket.Object("ss-poc-shibu", "derby-db-depl.yaml").download_file(f'/tmp/code/derby-db-depl.yaml')
    response = s3_bucket.Object("ss-poc-shibu", "derby-db-service.yaml").download_file(f'/tmp/code/derby-db-service.yaml')

    response = s3_bucket.Object("ss-poc-shibu", "account-depl.yaml").download_file(f'/tmp/code/account-depl.yaml')
    response = s3_bucket.Object("ss-poc-shibu", "account-service.yaml").download_file(f'/tmp/code/account-service.yaml')

    response = s3_bucket.Object("ss-poc-shibu", "customer-depl.yaml").download_file(f'/tmp/code/customer-depl.yaml')
    response = s3_bucket.Object("ss-poc-shibu", "customer-service.yaml").download_file(f'/tmp/code/customer-service.yaml')

    response = s3_bucket.Object("ss-poc-shibu", "loan-depl.yaml").download_file(f'/tmp/code/loan-depl.yaml')
    response = s3_bucket.Object("ss-poc-shibu", "loan-service.yaml").download_file(f'/tmp/code/loan-service.yaml')

    exec_cmd("/opt/aws eks update-kubeconfig --name ss-poc-cluster  --kubeconfig /tmp/code/kubeconfig --role-arn arn:aws:iam::560773393352:role/sspoc_basic_lambda_role") 

    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/derby-db-depl.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/derby-db-service.yaml")

    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/account-depl.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/account-service.yaml")

    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/customer-depl.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/customer-service.yaml")

    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/loan-depl.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/loan-service.yaml")

    print ("Completed .....")
    
    response = pipeline.put_job_success_result(
        jobId=event['CodePipeline.job']['id']
    )
    return response

