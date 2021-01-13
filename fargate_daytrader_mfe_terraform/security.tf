# ALB Security Group: Edit to restrict access to the application
resource "aws_security_group" "lb" {
  name        = "cb-load-balancer-security-group"
  description = "controls access to the ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = 0
    to_port     = 10000
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
   protocol         = "tcp"
   from_port        = 443
   to_port          = 443
   cidr_blocks      = ["0.0.0.0/0"]
   
   }

  egress {
    protocol    = "tcp"
    from_port   = 0
    to_port     = 10000
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Traffic to the ECS cluster should only come from the ALB
resource "aws_security_group" "ecs_tasks" {
  name        = "cb-ecs-tasks-security-group"
  description = "allow inbound access from the ALB only"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = 0
    to_port         = 10000
  }

  egress {
    protocol    = "tcp"
    from_port   = 0
    to_port     = 10000
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    protocol    = "tcp"
    from_port   = 3306
    to_port     = 3306
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#Create default security group in VPC
resource "aws_security_group" "default" {
  name        = "terraform_security_group"
  description = "Terraform example security group"
  vpc_id      = aws_vpc.main.id

  # Allow outbound internet access.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "ingress_docker_ports" {
  type              = "ingress"
  from_port         = 0
  to_port           = 10000
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs_tasks.id
}

resource "aws_security_group_rule" "rds_rule" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.default.id
}


resource "aws_security_group" "datastore_rds" {
  name        = "datastore-rds-daytrader"
  description = "allow inbound access from the daytrader tasks only"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = "3306"
    to_port         = "3306"
	#cidr_blocks = ["0.0.0.0/0"]
    security_groups = [aws_security_group.default.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}


#resource "aws_security_group_rule" "egress_docker_ports" {
#  type              = "egress"
#  from_port         = 0
#  to_port           = 10000
#  protocol          = "-1"
#  cidr_blocks       = ["0.0.0.0/0"]
#  security_group_id = aws_security_group.ecs_tasks.id
#}