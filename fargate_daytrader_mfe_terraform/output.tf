#Output load balancer host name for web

output "alb_hostname" {
  value = aws_lb.daytrader-web1.dns_name
}

output "alb_hostname_gateway" {
  value = aws_lb.daytrader-gateway.dns_name
}

# Output the ID of the RDS instance
#output "rds_instance_id" {
#  value = aws_db_instance.authdb.id
#}
#
## Output the address (aka hostname) of the RDS instance
#output "rds_instance_address" {
#  value = aws_db_instance.authdb.address
#}
#
## Output endpoint (hostname:port) of the RDS instance
#output "rds_instance_endpoint" {
#  value = aws_db_instance.authdb.endpoint
#}


# Output the ID of the RDS instance
output "rds_instance_id_account" {
  value = aws_db_instance.accounts.id
}

# Output the address (aka hostname) of the RDS instance
output "rds_instance_address_account" {
  value = aws_db_instance.accounts.address
}

# Output endpoint (hostname:port) of the RDS instance
output "rds_instance_endpoint_account" {
  value = aws_db_instance.accounts.endpoint
}


