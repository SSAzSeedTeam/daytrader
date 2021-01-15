resource "aws_ecs_cluster" "daytrader-ecs-cluster1" {
  name = "daytrader-cluster1"
  setting {
  name = "containerInsights"
  value = "enabled"
  } 
}
#Create IAM Roles for ECS-------
resource "aws_iam_role" "ecs_task_role" {
  name = "ecs_task_role"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  tags = {
    role = "ecs_task_execution_role"
  }
}
#Create IAM policy 
resource "aws_iam_policy" "policy" {
  name        = "test-policy"
  description = "A test policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
		"application-autoscaling:*",
		"ecs:*",
        "ecs:Describe*",
		"ecs:UpdateService",
		"ec2:AttachNetworkInterface",
        "ec2:CreateNetworkInterface",
        "ec2:CreateNetworkInterfacePermission",
        "ec2:DeleteNetworkInterface",
        "ec2:DeleteNetworkInterfacePermission",
        "ec2:Describe*",
        "ec2:DetachNetworkInterface",
        "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
        "elasticloadbalancing:RegisterTargets",
		"route53:*",
        "route53:ChangeResourceRecordSets",
        "route53:CreateHealthCheck",
        "route53:DeleteHealthCheck",
        "route53:Get*",
        "route53:List*",
        "route53:UpdateHealthCheck",
		"servicediscovery:*",
        "servicediscovery:DeregisterInstance",
        "servicediscovery:Get*",
        "servicediscovery:List*",
        "servicediscovery:RegisterInstance",
        "servicediscovery:UpdateInstanceCustomHealthStatus"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
	{
            "Sid": "AutoScaling",
            "Effect": "Allow",
            "Action": [
                "autoscaling:Describe*"
            ],
            "Resource": "*"
        }
  ]
}
EOF
}

#Attach the policy to the IAM role
resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

#aws_service_discovery_private_dns_namespace.example1.id


# -------------------------------
#  Service Discovery
# -------------------------------
resource "aws_service_discovery_private_dns_namespace" "discover" {
  name        = "example.com"
  description = "Domain for all services"
  vpc         = aws_vpc.main.id
}

resource "aws_route53_resolver_rule" "sys" {
  domain_name = "example.com"
  rule_type   = "SYSTEM"
}

#resource "aws_service_discovery_service" "daytrader-auth-server" {
#  name = "daytrader-auth-server"
#
#  dns_config {
#    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
#	
#    dns_records {
#      ttl  = 10
#      type = "A"
#    }
#
#    routing_policy = "MULTIVALUE"
#  }
#
#  health_check_custom_config {
#    failure_threshold = 5
#  }
#}

resource "aws_service_discovery_service" "daytrader-gateway" {
  name = "daytrader-gateway"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}

resource "aws_service_discovery_service" "daytrader-web-mfe-container-static" {
  name = "daytrader-web-mfe-container-static"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}
resource "aws_service_discovery_service" "daytrader-web-mfe-accounts-static" {
  name = "daytrader-web-mfe-accounts-static"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}

resource "aws_service_discovery_service" "daytrader-accounts" {
  name = "daytrader-accounts"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}

resource "aws_service_discovery_service" "daytrader-web-mfe-portfolios-static" {
  name = "daytrader-web-mfe-portfolios-static"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}

resource "aws_service_discovery_service" "daytrader-portfolios" {
  name = "daytrader-portfolios"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}


resource "aws_service_discovery_service" "daytrader-web-mfe-quotes-static" {
  name = "daytrader-web-mfe-quotes-static"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}
resource "aws_service_discovery_service" "daytrader-quotes" {
  name = "daytrader-quotes"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.discover.id
	
    dns_records {
      ttl  = 10
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 5
  }
}

#resource "aws_service_discovery_public_dns_namespace" "test-service" {
#  name        = "example.com"
#  description = "example"
#}
#
#resource "aws_service_discovery_service" "test-service" {
#  name = "test-service"
#
#  dns_config {
#    namespace_id = aws_service_discovery_public_dns_namespace.test-service.id
#
#    dns_records {
#      ttl  = 10
#      type = "A"
#    }
#  }
#
#  health_check_config {
#    failure_threshold = 10
#    resource_path     = var.health_check_path
#    type              = "HTTP"
#  }
#}
#----------------------------------------------------------------------------------------
#Auth server task def and service start------------------------------------
#resource "aws_ecs_task_definition" "daytrader-auth-task-def" {
#  family                   = "daytrader-auth-task"
#  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
#  task_role_arn            = aws_iam_role.ecs_task_role.arn
#  network_mode             = "awsvpc"
#  requires_compatibilities = ["FARGATE"]
#  cpu                      = var.fargate_cpu
#  memory                   = var.fargate_memory
#  
#  
#  container_definitions = jsonencode([{
#   name        = "daytrader-auth-server"
#   cpu 		   = 256
#   memory	   = 2048
#   image       = "azseed/daytrader-auth-server:2.1"
#   essential   = true
#   portMappings = [{
#     protocol      = "tcp"
#     containerPort = 1555
#     hostPort      = 1555
#   }]
#   environment = [
#            {
#                "name": "DAYTRADER_DATABASE_DRIVER",
#                "value": "com.mysql.cj.jdbc.Driver"
#            },
#			{
#                "name": "DAYTRADER_DATABASE_URL",
#                "value": "jdbc:mysql://${aws_db_instance.authdb.endpoint}/${aws_db_instance.authdb.name}?useSSL=true&requireSSL=false&serverTimezone=UTC"
#            },
#			{
#                "name": "DAYTRADER_DATABASE_USERNAME",
#                "value": "${aws_db_instance.authdb.username}"
#            },
#			{
#                "name": "DAYTRADER_DATABASE_PASSWORD",
#                "value": "${aws_db_instance.authdb.password}"
#            },
#			{
#                "name": "DAYTRADER_DATABASE_DIALECT",
#                "value": "org.hibernate.dialect.MySQL5InnoDBDialect"
#            }
#        ]
#   logConfiguration = {
#        logDriver = "awslogs",
#			options = {
#                awslogs-group = "/ecs/cb-app",
#                awslogs-region = "us-west-2",
#                awslogs-stream-prefix = "awslogs-daytrader-auth"
#            }
#    }
#   }])
#}
#
#resource "aws_ecs_service" "daytrader-service-auth" {
#  name            = "daytrader-auth-server"
#  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
#  task_definition = aws_ecs_task_definition.daytrader-auth-task-def.arn
#  desired_count   = var.app_count
#  launch_type     = "FARGATE"
#  #health_check_grace_period_seconds = 300
#  
#  network_configuration {
#    security_groups  = [aws_security_group.ecs_tasks.id]
#    subnets          = aws_subnet.private.*.id
#    assign_public_ip = true
#  }
#  
#  service_registries {
#    registry_arn = aws_service_discovery_service.daytrader-auth-server.arn
#	#port = 1555
#	container_name = "daytrader-auth-server"
#	#container_port = 1555
#  }
#
##load_balancer {
##  target_group_arn = aws_alb_target_group.auth-target.id
##  container_name   = "daytrader-auth-server"
##  container_port   = 1555
##}
#  
#}
#---------------------------END---------------------------



#resource "aws_ecs_task_definition" "daytrader-task-def" {
#  family                   = "daytrader-task"
#  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
#  task_role_arn            = aws_iam_role.ecs_task_role.arn
#  network_mode             = "awsvpc"
#  requires_compatibilities = ["FARGATE"]
#  cpu                      = var.fargate_cpu
#  memory                   = var.fargate_memory
#  
#  
#  container_definitions = jsonencode([{
#   name        = "daytrader-web"
#   cpu 		   = 256
#   memory	   = 2048
#   image       = "azseed/daytrader-web:2.1"
#   essential   = true
#   portMappings = [{
#     protocol      = "tcp"
#     containerPort = 5443
#     hostPort      = 5443
#   }]
#   environment = [
#            {
#                "name": "DAYTRADER_ACCOUNTS_SERVICE",
#                "value": "http://daytrader-accounts.example.com:1443"
#            },
#            {
#                "name": "DAYTRADER_GATEWAY_SERVICE",
#                "value": "http://daytrader-gateway.example.com:2443"
#            },
#			{
#                "name": "DAYTRADER_PORTFOLIOS_SERVICE",
#                "value": "http://daytrader-portfolios.example.com:3443"
#            },
#			{
#                "name": "DAYTRADER_QUOTES_SERVICE",
#                "value": "http://daytrader-quotes.example.com:4443"
#            },
#			{
#                "name": "DAYTRADER_AUTH_SERVICE",
#                "value": "http://daytrader-auth-server.example.com:1555"
#            },
#			{
#				"name": "DAYTRADER_OAUTH_ENABLE",
#				"value": "false"
#			}
#        ]
#   
#   logConfiguration = {
#        logDriver = "awslogs",
#			options = {
#                awslogs-group = "/ecs/cb-app",
#                awslogs-region = "us-west-2",
#                awslogs-stream-prefix = "awslogs-daytrader-web"
#            }
#    }
#  }])
#}
#resource "aws_ecs_service" "daytrader-service-web" {
#  name            = "daytrader-web-service"
#  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
#  task_definition = aws_ecs_task_definition.daytrader-task-def.arn
#  desired_count   = var.app_count
#  launch_type     = "FARGATE"
#  health_check_grace_period_seconds = 300
#
#
#  network_configuration {
#    security_groups  = [aws_security_group.ecs_tasks.id]
#    subnets          = aws_subnet.private.*.id
#    assign_public_ip = true
#  }
#
# service_registries {
#    registry_arn = aws_service_discovery_service.daytrader-web.arn
#	#port = 5443
#	container_name = "daytrader-web"
#	#container_port = 5443
#  }
#  load_balancer {
#    target_group_arn = aws_alb_target_group.web-target.id
#    container_name   = "daytrader-web"
#    container_port   = 5443
#  }
#  depends_on = [aws_iam_role_policy_attachment.test-attach, aws_ecs_service.daytrader-service-gateway]
#}

#Gateway task def and service start------------------------------------
resource "aws_ecs_task_definition" "daytrader-gateway-task-def" {
  family                   = "daytrader-gateway-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-gateway"
   cpu 		   = 512
   memory	   = 2048
   image       = "azseed/daytrader-gateway:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 2443
     hostPort      = 2443
   }]
   environment = [
            {
                "name": "DAYTRADER_ACCOUNTS_SERVICE",
                "value": "http://daytrader-accounts.example.com:1443"
            },
			{
                "name": "DAYTRADER_PORTFOLIOS_SERVICE",
                "value": "http://daytrader-portfolios.example.com:3443"
            },
			{
                "name": "DAYTRADER_QUOTES_SERVICE",
                "value": "http://daytrader-quotes.example.com:4443"
            },
#			{
#               "name": "DAYTRADER_GATEWAY_SERVICE",
#               "value": "http://daytrader-gateway:2443"
#           },
			{
				"name": "DAYTRADER_OAUTH_ENABLE",
				"value": "false"
			}
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "awslogs-daytrader-gateway"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-service-gateway" {
  name            = "daytrader-gateway"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-gateway-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-gateway.arn
	container_name = "daytrader-gateway"
	
	#container_port = 2443
	}
  
  load_balancer {
    target_group_arn = aws_alb_target_group.gateway-target6.id
    container_name   = "daytrader-gateway"
    container_port   = 2443
  }
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}
#---------------------------END---------------------------



#Accounts task def and service start------------------------------------
resource "aws_ecs_task_definition" "daytrader-accounts-task-def" {
  family                   = "daytrader-accounts-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-accounts"
   cpu 		   = 1024
   memory	   = 5120
   image       = "azseed/daytrader-accounts:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 1443
     hostPort      = 1443
   }]
   environment = [
            {
                "name": "DAYTRADER_GATEWAY_SERVICE",
                "value": "http://daytrader-gateway.example.com:2443"
            },
			{
                "name": "DAYTRADER_PORTFOLIOS_SERVICE",
                "value": "http://daytrader-portfolios.example.com:3443"
            },
			{
                "name": "DAYTRADER_QUOTES_SERVICE",
                "value": "http://daytrader-quotes:4443"
            },
#			{
#                "name": "DAYTRADER_AUTH_SERVICE",
#                "value": "http://daytrader-auth-server.example.com:1555"
#            },
			{
				"name": "DAYTRADER_OAUTH_ENABLE",
				"value": "false"
			},
			{
                "name": "DAYTRADER_DATABASE_DRIVER",
                "value": "com.mysql.cj.jdbc.Driver"
            },
			{
                "name": "DAYTRADER_DATABASE_URL",
                "value": "jdbc:mysql://${aws_db_instance.accounts.endpoint}/${aws_db_instance.accounts.name}?useSSL=true&requireSSL=false&serverTimezone=UTC"
            },
			{
                "name": "DAYTRADER_DATABASE_USERNAME",
                "value": "${aws_db_instance.accounts.username}"
            },
			{
                "name": "DAYTRADER_DATABASE_PASSWORD",
                "value": "${aws_db_instance.accounts.password}"
            },
			{
                "name": "DAYTRADER_DATABASE_DIALECT",
                "value": "org.hibernate.dialect.MySQL5InnoDBDialect"
            }
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "awslogs-daytrader-accounts"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-service-accounts" {
  name            = "daytrader-accounts"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-accounts-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-accounts.arn
	container_name = "daytrader-accounts"
	#container_port = 1443
	#port = 1443
	}
  
  #load_balancer {
  #  target_group_arn = aws_alb_target_group.gateway-target.id
  #  container_name   = "datrader-gateway"
  #  container_port   = 2443
  #}
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}
#---------------------------END---------------------------



#Portfolios task def and service start------------------------------------
resource "aws_ecs_task_definition" "daytrader-portfolios-task-def" {
  family                   = "daytrader-portfolios-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-portfolios"
   cpu 		   = 256
   memory	   = 2048
   image       = "azseed/daytrader-portfolios:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 3443
     hostPort      = 3443
   }]
   environment = [
            {
                "name": "DAYTRADER_GATEWAY_SERVICE",
                "value": "http://daytrader-gateway.example.com:2443"
            },
			{
                "name": "DAYTRADER_ACCOUNTS_SERVICE",
                "value": "http://daytrader-accounts.example.com:1443"
            },
			{
                "name": "DAYTRADER_QUOTES_SERVICE",
                "value": "http://daytrader-quotes.example.com:4443"
            },
#			{
#                "name": "DAYTRADER_AUTH_SERVICE",
#                "value": "http://daytrader-auth-server.example.com:1555"
#            },
			{
				"name": "DAYTRADER_OAUTH_ENABLE",
				"value": "false"
			},
			{
                "name": "DAYTRADER_DATABASE_DRIVER",
                "value": "com.mysql.cj.jdbc.Driver"
            },
			{
                "name": "DAYTRADER_DATABASE_URL",
                "value": "jdbc:mysql://${aws_db_instance.portfolios.endpoint}/${aws_db_instance.portfolios.name}?useSSL=true&requireSSL=false&serverTimezone=UTC"
            },
			{
                "name": "DAYTRADER_DATABASE_USERNAME",
                "value": "${aws_db_instance.portfolios.username}"
            },
			{
                "name": "DAYTRADER_DATABASE_PASSWORD",
                "value": "${aws_db_instance.portfolios.password}"
            },
			{
                "name": "DAYTRADER_DATABASE_DIALECT",
                "value": "org.hibernate.dialect.MySQL5InnoDBDialect"
            }
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "awslogs-daytrader-portfolios"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-service-portfolios" {
  name            = "daytrader-portfolios"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-portfolios-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-portfolios.arn
	container_name = "daytrader-portfolios"
	#container_port = 3443
	
	#port = 1443
	}
  
  #load_balancer {
  #  target_group_arn = aws_alb_target_group.gateway-target.id
  #  container_name   = "datrader-gateway"
  #  container_port   = 2443
  #}
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}
#---------------------------END---------------------------
#
#
#Quotes task def and service start------------------------------------
resource "aws_ecs_task_definition" "daytrader-quotes-task-def" {
  family                   = "daytrader-quotes-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-quotes"
   cpu 		   = 256
   memory	   = 2048
   image       = "azseed/daytrader-quotes:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 4443
     hostPort      = 4443
   }]
   environment = [
            {
                "name": "DAYTRADER_GATEWAY_SERVICE",
                "value": "http://daytrader-gateway.example.com:2443"
            },
			{
                "name": "DAYTRADER_ACCOUNTS_SERVICE",
                "value": "http://daytrader-accounts.example.com:1443"
            },
			{
                "name": "DAYTRADER_PORTFOLIOS_SERVICE",
                "value": "http://daytrader-portfolios.example.com:3443"
            },
#			{
#                "name": "DAYTRADER_AUTH_SERVICE",
#                "value": "http://daytrader-auth-server.example.com:1555"
#            },
			{
				"name": "DAYTRADER_OAUTH_ENABLE",
				"value": "false"
			},
			{
                "name": "DAYTRADER_DATABASE_DRIVER",
                "value": "com.mysql.cj.jdbc.Driver"
            },
			{
                "name": "DAYTRADER_DATABASE_URL",
                "value": "jdbc:mysql://${aws_db_instance.quotes.endpoint}/${aws_db_instance.quotes.name}?useSSL=true&requireSSL=false&serverTimezone=UTC"
            },
			{
                "name": "DAYTRADER_DATABASE_USERNAME",
                "value": "${aws_db_instance.quotes.username}"
            },
			{
                "name": "DAYTRADER_DATABASE_PASSWORD",
                "value": "${aws_db_instance.quotes.password}"
            },
			{
                "name": "DAYTRADER_DATABASE_DIALECT",
                "value": "org.hibernate.dialect.MySQL5InnoDBDialect"
            }
			
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "awslogs-daytrader-quotes"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-service-quotes" {
  name            = "daytrader-quotes"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-quotes-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-quotes.arn
	container_name = "daytrader-quotes"
	#container_port = 4443
	
	#port = 1443
	}
  
  #load_balancer {
  #  target_group_arn = aws_alb_target_group.gateway-target.id
  #  container_name   = "datrader-gateway"
  #  container_port   = 2443
  #}
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}
#---------------------------END---------------------------

#-------------- reactJS - micro-frontend - static - start -----------------------------------------------

resource "aws_ecs_task_definition" "daytrader-web-mfe-container-static-task-def" {
  family                   = "daytrader-web-mfe-container-static-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-web-mfe-container-static"
   cpu 		   = 512
   memory	   = 2048
   image       = "azseed/daytrader-web-mfe-container-static:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 80
     hostPort      = 80
   }]
   environment = [
            {
                "name": "REACT_APP_DAYTRADER_GATEWAY_SERVICE",
                "value": "http://${aws_lb.daytrader-gateway.dns_name}:2443"
            },
			{
                "name": "REACT_APP_DAYTRADER_ACCOUNT_MFE_URL",
                "value": "http://${aws_lb.daytrader-accounts.dns_name}:3002"
            },
			{
                "name": "REACT_APP_DAYTRADER_PORTFOLIO_MFE_URL",
                "value": "http://${aws_lb.daytrader-portfolios.dns_name}:3003"
            },
			{
                "name": "REACT_APP_DAYTRADER_QUOTES_MFE_URL",
                "value": "http://${aws_lb.daytrader-quotes.dns_name}:3004"
            }
			
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "daytrader-web-mfe-container-static"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-web-mfe-container-static-service" {
  name            = "daytrader-web-mfe-container-static"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-web-mfe-container-static-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-web-mfe-container-static.arn
	container_name = "daytrader-web-mfe-container-static"
	#container_port = 80
	#port = 1443
	}
  
  load_balancer {
    target_group_arn = aws_alb_target_group.web-target2.id
    container_name   = "daytrader-web-mfe-container-static"
    container_port   = 80
  }
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}



#---------------------------ACCOUNTS ---------------------------------
resource "aws_ecs_task_definition" "daytrader-web-mfe-accounts-static-task-def" {
  family                   = "daytrader-web-mfe-accounts-static-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-web-mfe-accounts-static"
   cpu 		   = 512
   memory	   = 5120
   image       = "azseed/daytrader-web-mfe-accounts-static:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 80
     hostPort      = 80
   }]
   environment = [
            {
                "name": "REACT_APP_DAYTRADER_GATEWAY_SERVICE",
                "value": "http://${aws_lb.daytrader-gateway.dns_name}:2443"
            }
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "daytrader-web-mfe-accounts-static"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-web-mfe-accounts-static-service" {
  name            = "daytrader-web-mfe-accounts-static"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-web-mfe-accounts-static-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-web-mfe-accounts-static.arn
	container_name = "daytrader-web-mfe-accounts-static"
	#container_port = 80
	
	#port = 1443
	}
  
  load_balancer {
    target_group_arn = aws_alb_target_group.accounts-target1.id
    container_name   = "daytrader-web-mfe-accounts-static"
    container_port   = 80
  }
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}


#---------------------------END---------------------------


#---------------------------PORTFOLIOS ---------------------------------
resource "aws_ecs_task_definition" "daytrader-web-mfe-portfolios-static-task-def" {
  family                   = "daytrader-web-mfe-portfolios-static-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-web-mfe-portfolios-static"
   cpu 		   = 512
   memory	   = 5120
   image       = "azseed/daytrader-web-mfe-portfolios-static:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 80
     hostPort      = 80
   }]
   environment = [
            {
                "name": "REACT_APP_DAYTRADER_GATEWAY_SERVICE",
                "value": "http://${aws_lb.daytrader-gateway.dns_name}:2443"
            }
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "daytrader-web-mfe-portfolios-static"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-web-mfe-portfolios-static-service" {
  name            = "daytrader-web-mfe-portfolios-static"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-web-mfe-portfolios-static-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-web-mfe-portfolios-static.arn
	container_name = "daytrader-web-mfe-portfolios-static"
	#container_port = 80
	
	#port = 1443
	}
  
  load_balancer {
    target_group_arn = aws_alb_target_group.portfolios-target1.id
    container_name   = "daytrader-web-mfe-portfolios-static"
    container_port   = 80
  }
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}


#---------------------------END---------------------------

#---------------------------QUOTES ---------------------------------
resource "aws_ecs_task_definition" "daytrader-web-mfe-quotes-static-task-def" {
  family                   = "daytrader-web-mfe-portfolios-static-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  
  
  container_definitions = jsonencode([{
   name        = "daytrader-web-mfe-quotes-static"
   cpu 		   = 512
   memory	   = 5120
   image       = "azseed/daytrader-web-mfe-quotes-static:2.1"
   essential   = true
   portMappings = [{
     protocol      = "tcp"
     containerPort = 80
     hostPort      = 80
   }]
   environment = [
            {
                "name": "REACT_APP_DAYTRADER_GATEWAY_SERVICE",
                "value": "http://${aws_lb.daytrader-gateway.dns_name}:2443"
            }
        ]
   logConfiguration = {
        logDriver = "awslogs",
			options = {
                awslogs-group = "/ecs/cb-app",
                awslogs-region = "us-west-2",
                awslogs-stream-prefix = "daytrader-web-mfe-quotes-static"
            }
    }
   }])
}

resource "aws_ecs_service" "daytrader-web-mfe-quotes-static-service" {
  name            = "daytrader-web-mfe-quotes-static"
  cluster         = aws_ecs_cluster.daytrader-ecs-cluster1.id
  task_definition = aws_ecs_task_definition.daytrader-web-mfe-quotes-static-task-def.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  #health_check_grace_period_seconds = 300
  


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id, aws_security_group.default.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  service_registries {
    registry_arn = aws_service_discovery_service.daytrader-web-mfe-quotes-static.arn
	container_name = "daytrader-web-mfe-quotes-static"
	#container_port = 80
	
	#port = 1443
	}
  
  load_balancer {
    target_group_arn = aws_alb_target_group.quotes-target1.id
    container_name   = "daytrader-web-mfe-quotes-static"
    container_port   = 80
  }
  depends_on = [aws_iam_role_policy_attachment.test-attach]
}

#-------------------------------------------END-------------------------------------------------------------




#Create IAM ECS AUTO SCALE Role-------
resource "aws_iam_role" "ecs_auto_scale_role" {
  name = "ecs_auto_scale_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "application-autoscaling.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  tags = {
    role = "ecs_auto_scale_role"
  }
}

resource "aws_appautoscaling_target" "target" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.daytrader-ecs-cluster1.name}/${aws_ecs_service.daytrader-web-mfe-container-static-service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = 1
  max_capacity       = 2
  
}

# Automatically scale capacity up by one
resource "aws_appautoscaling_policy" "up" {
  name               = "cb_scale_up"
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.daytrader-ecs-cluster1.name}/${aws_ecs_service.daytrader-web-mfe-container-static-service.name}"
  scalable_dimension = "ecs:service:DesiredCount"

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Maximum"

    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = 1
    }
  }

  depends_on = [aws_appautoscaling_target.target]
}

# Automatically scale capacity down by one
resource "aws_appautoscaling_policy" "down" {
  name               = "cb_scale_down"
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.daytrader-ecs-cluster1.name}/${aws_ecs_service.daytrader-web-mfe-container-static-service.name}"
  scalable_dimension = "ecs:service:DesiredCount"

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Maximum"

    step_adjustment {
      metric_interval_lower_bound = 0
      scaling_adjustment          = -1
    }
  }

  depends_on = [aws_appautoscaling_target.target]
}

# CloudWatch alarm that triggers the autoscaling up policy
resource "aws_cloudwatch_metric_alarm" "service_cpu_high" {
  alarm_name          = "cb_cpu_utilization_high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "85"

  dimensions = {
    ClusterName = aws_ecs_cluster.daytrader-ecs-cluster1.name
    ServiceName = aws_ecs_service.daytrader-web-mfe-container-static-service.name
  }

  alarm_actions = [aws_appautoscaling_policy.up.arn]
}

# CloudWatch alarm that triggers the autoscaling down policy
resource "aws_cloudwatch_metric_alarm" "service_cpu_low" {
  alarm_name          = "cb_cpu_utilization_low"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "10"

  dimensions = {
    ClusterName = aws_ecs_cluster.daytrader-ecs-cluster1.name
    ServiceName = aws_ecs_service.daytrader-web-mfe-container-static-service.name
  }

  alarm_actions = [aws_appautoscaling_policy.down.arn]
}