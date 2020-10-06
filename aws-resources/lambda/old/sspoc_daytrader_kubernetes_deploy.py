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

def sspoc_daytrader_kubernetes_deploy(event, context):
    print ("printing from sspoc_daytrader_kubernetes_deploy.py")

    exec_cmd('mkdir -v /tmp/code/')

    response = s3_bucket.Object("ss-poc-daytrader", "accounts/deployment.yaml").download_file(f'/tmp/code/accounts_deployment.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "accounts/service.yaml").download_file(f'/tmp/code/accounts_service.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "gateway/deployment.yaml").download_file(f'/tmp/code/gateway_deployment.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "gateway/service.yaml").download_file(f'/tmp/code/gateway_service.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "portfolios/deployment.yaml").download_file(f'/tmp/code/portfolios_deployment.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "portfolios/service.yaml").download_file(f'/tmp/code/portfolios_service.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "quotes/deployment.yaml").download_file(f'/tmp/code/quotes_deployment.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "quotes/service.yaml").download_file(f'/tmp/code/quotes_service.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "web/deployment.yaml").download_file(f'/tmp/code/web_deployment.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "web/service.yaml").download_file(f'/tmp/code/web_service.yaml')
    response = s3_bucket.Object("ss-poc-daytrader", "ingress/ingress.yaml").download_file(f'/tmp/code/ingress_ingress.yaml')


    exec_cmd("/opt/aws eks update-kubeconfig --name ss-poc-cluster  --kubeconfig /tmp/code/kubeconfig --role-arn arn:aws:iam::560773393352:role/sspoc_basic_lambda_role") 

    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/accounts_deployment.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/accounts_service.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/gateway_deployment.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/gateway_service.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/portfolios_deployment.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/portfolios_service.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/quotes_deployment.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/quotes_service.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/web_deployment.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/web_service.yaml")
    exec_cmd("/opt/kubectl/kubectl --kubeconfig /tmp/code/kubeconfig apply -f /tmp/code/ingress_ingress.yaml")

    print ("Completed .....")
    
    response = pipeline.put_job_success_result(
        jobId=event['CodePipeline.job']['id']
    )
    return response

