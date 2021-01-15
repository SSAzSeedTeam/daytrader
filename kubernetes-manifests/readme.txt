These instructions are to be run on a Windows machine
-----------------------------------------------------

01> Open windows command prompt and do a "az login"
02> Do a git clone of daytrader project source code 
    git clone https://www.github.com/SSAzSeedTeam/daytrader/
03> In the command prompt cd to "daytrader\kubernetes-manifests"
04> Download kubectl.exe from https://storage.googleapis.com/kubernetes-release/release/v1.19.0/bin/windows/amd64/kubectl.exe
    Put kubectl.exe in any directory in the %PATH%, or put it in current directory("daytrader\kubernetes-manifests")
05> Run all the commands in the "azure-mysql-deploy.txt" on command prompt, one by one
06> Run all the commands in the "azure-kubernetes-cluster-create.txt" on command prompt, one by one
07> Run all the commands in the "azure-daytrader-deploy.txt" on command prompt, one by one
08> Once all your testing is complete, go to "azure-kubernetes-cluster-create.txt" and execute the 
    resource deletion commands at the bottom of the file
    