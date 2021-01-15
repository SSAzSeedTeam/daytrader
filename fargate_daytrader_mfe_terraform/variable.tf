variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "us-west-2"
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default = "myEcsTaskExecutionRole"
}

variable "ecs_auto_scale_role_name" {
  description = "ECS auto scale role Name"
  default = "myEcsAutoScaleRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

variable "app_image" {
  description = "Docker image to run in the ECS cluster"
  default     = ""
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 80
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 1
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "4096"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "16384"
}

#variable "map_environment" {
#  description = "Map of variables to define an ECS task."
#  type = map(string({
#    "DAYTRADER_ACCOUNTS_SERVICE" = "http://daytrader-accounts:1443"
#    "DAYTRADER_GATEWAY_SERVICE" = "http://daytrader-gateway:2443"
#    "DAYTRADER_PORTFOLIOS_SERVICE" = "http://daytrader-portfolios:3443"
#    "DAYTRADER_QUOTES_SERVICE" = "http://daytrader-quotes:4443"
#	"DAYTRADER_AUTH_SERVICE" = "http://daytrader-auth-server:1555"
#  }))
#}