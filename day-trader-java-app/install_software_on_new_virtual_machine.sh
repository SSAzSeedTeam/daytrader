#!/bin/bash

#----------------------------------------------------------------------
sudo apt-get update
sudo apt-get install derby-tools -y
sudo apt-get install unzip -y
sudo apt-get install jq -y
sudo apt-get install busybox -y
sudo apt-get install dos2unix -y
sudo apt-get install maven -y
#----------------------------------------------------------------------

sudo apt-get install docker.io -y
sudo groupadd docker
sudo gpasswd -a $SOME_USER docker
#----------------------------------------------------------------------

VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)
sudo curl -L https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod 755 /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
#----------------------------------------------------------------------

curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
#----------------------------------------------------------------------

