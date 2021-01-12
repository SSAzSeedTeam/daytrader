
provider "aws" {
  region = "us-east-1"
  access_key = "AKIAIMEAWD7K6OWYKADA"
  secret_key = "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"
}


#Create VPC
resource "aws_vpc" "cdc-vpc" {
  cidr_block       = "10.0.0.0/16"
#  instance_tenancy = "default"
  tags = {
    Name = "main-vpc"
    project = "cdc"
  }
}

#Create Internet Gateway
resource "aws_internet_gateway" "cdc-gw" {
  vpc_id = aws_vpc.cdc-vpc.id

  tags = {
    Name = "cdc-gw"
    project = "cdc"
  }
}

#Create Custom Route Table
resource "aws_route_table" "cdc-rt" {
  vpc_id = aws_vpc.cdc-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.cdc-gw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id = aws_internet_gateway.cdc-gw.id
  }

  tags = {
    Name = "cdc-rt"
    project = "cdc"
  }
}

#Create a Subnet
resource "aws_subnet" "cdc-subnet" {
  vpc_id     = aws_vpc.cdc-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "cdc-subnet"
    project = "cdc"
  }
}

#Associate Subnet with Route Table
resource "aws_route_table_association" "cdc-a" {
  subnet_id      = aws_subnet.cdc-subnet.id
  route_table_id = aws_route_table.cdc-rt.id
}

#Create Security Group to allow all ports
resource "aws_security_group" "cdc-sg" {
  name        = "cdc-sg"
  description = "Open specific ports"
  vpc_id      = aws_vpc.cdc-vpc.id

  ingress {
    description = "All"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
#  ingress {
#    description = "HTTPS"
#    from_port   = 443
#    to_port     = 443
#    protocol    = "tcp"
#    cidr_blocks = ["0.0.0.0/0"]
#  }
#  ingress {
#    description = "HTTP"
#    from_port   = 80
#    to_port     = 80
#    protocol    = "tcp"
#    cidr_blocks = ["0.0.0.0/0"]
#  }
#  ingress {
#    description = "SSH"
#    from_port   = 22
#    to_port     = 22
#    protocol    = "tcp"
#    cidr_blocks = ["0.0.0.0/0"]
#  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "cdc-sg"
    project = "cdc"
  }
}

#Create a anetwork interface with an IP in the subnet created in step 4
resource "aws_network_interface" "cdc-webserver" {
  subnet_id       = aws_subnet.cdc-subnet.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.cdc-sg.id]
}

#Assign an elastic IP to the network interface created
resource "aws_eip" "cdc-lb" {
  vpc      = true
  network_interface = aws_network_interface.cdc-webserver.id
  associate_with_private_ip = "10.0.1.50"
  depends_on = [aws_internet_gateway.cdc-gw, aws_instance.cdc-ec]
}

output "ec2_public_ip" {
  value = aws_eip.cdc-lb.public_ip
}

#Create EC2
resource "aws_instance" "cdc-ec" {
  ami = "ami-04d29b6f966df1537"
  instance_type = "t3.large"
  #instance_type = "t2.micro"
  availability_zone = "us-east-1a"
  key_name = "cdcdemokey"

  network_interface {
      device_index = 0
      network_interface_id = aws_network_interface.cdc-webserver.id
  }
  
#user_data = "${file("docker_install_compose.sh")}"

user_data = <<-EOF
		#! /bin/bash
        sudo yum install -y git
        cd home/ec2-user
        git clone https://github.com/spark2017/CDC-CreditCard.git
        #Install Docker 
        sudo yum update -y
        sudo yum install docker -y
        sudo service docker start
        sudo usermod -a -G docker ec2-user
        #Install Docker Compose
        sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        #Command to start the server
        cd CDC-CreditCard/docker
        export DATAFLOW_VERSION=2.3.0.BUILD-SNAPSHOT 
        export SKIPPER_VERSION=2.2.0.BUILD-SNAPSHOT 
        export STREAM_APPS_URI='https://dataflow.spring.io/Einstein-BUILD-SNAPSHOT-stream-applications-kafka-maven&force=true'
        docker system prune -f
        docker-compose -f ./docker-compose.yml -f ./docker-compose-prometheus.yml -f ./docker-compose.fraud.yml up -d
	sleep 180
	d=$'\'$..detection\''
	s1=$'stream create --name fraud-detection --definition "fraud-detection=cdc-debezium --cdc.config.schema.whitelist=cdc --cdc.name=my-sql-connector --cdc.connector=postgres --cdc.config.database.user=postgres --cdc.config.database.password=postgres --cdc.config.database.dbname=postgres --cdc.config.database.hostname=postgres-cdc --cdc.config.database.port=5432 --cdc.config.database.server.name=my-app-connector --cdc.flattering.enabled=true | fraud-detection --model-fetch=output --model=\'classpath:/fraud_detection_graph.pb\' | counter --counter.name=credit --counter.tag.expression.fraud=#jsonPath(payload,'$d')"'
	echo $s1 | docker exec -i dataflow-server java -jar shell.jar
	sleep 10
	echo 'stream create --name fraud-log --definition ":fraud-detection.fraud-detection > log"' | docker exec -i dataflow-server java -jar shell.jar
	echo 'stream deploy --name  fraud-detection  --platformName default' | docker exec -i dataflow-server java -jar shell.jar
	echo 'stream deploy --name  fraud-log  --platformName default' | docker exec -i dataflow-server java -jar shell.jar
	EOF

  tags = {
    Name = "cdc-ec"
    project = "cdc"
  }
}
