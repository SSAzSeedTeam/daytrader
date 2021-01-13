# RDS Instance for AuthDB---------------------
#resource "aws_db_instance" "authdb" {
#    name                        = "authdb"
#    identifier                  = "authdb"
#    username                    = "admin"
#    password                    = "admin1234"
#    port                        = "3306"
#    engine                      = "mysql"
#    engine_version              = "8.0.20"
#    instance_class              = "db.t2.micro"
#    allocated_storage           = "10"
#    storage_encrypted           = false
#    vpc_security_group_ids      = [aws_security_group.datastore_rds.id]
#    db_subnet_group_name        = aws_db_subnet_group.datastore.name
#    parameter_group_name        = aws_db_parameter_group.default.name
#	enabled_cloudwatch_logs_exports = ["error","general"]
#    #multi_az                    = true
#    storage_type                = "gp2"
#    publicly_accessible         = true
#    # snapshot_identifier         = "datastore-${var.environment}"
#    allow_major_version_upgrade = false
#    auto_minor_version_upgrade  = false
#    apply_immediately           = true
#    maintenance_window          = "sun:02:00-sun:04:00"
#    skip_final_snapshot         = true
#    # copy_tags_to_snapshot       = "${var.copy_tags_to_snapshot}"
#    backup_retention_period     = 7
#    backup_window               = "04:00-06:00"
#    # tags                        = "${module.label.tags}"
#    #final_snapshot_identifier   = "authdb"
#	#performance_insights_enabled  = true
#  }
 # RDS Instance for accounts--------------------- 
  resource "aws_db_instance" "accounts" {
    name                        = "accounts"
    identifier                  = "accounts"
    username                    = "admin"
    password                    = "12345678"
    port                        = "3306"
    engine                      = "mysql"
    engine_version              = "8.0.20"
    instance_class              = "db.t2.micro"
    allocated_storage           = "10"
    storage_encrypted           = false
    vpc_security_group_ids      = [aws_security_group.default.id]
    db_subnet_group_name        = aws_db_subnet_group.datastore.name
    parameter_group_name        = aws_db_parameter_group.default.name
    #multi_az                    = true
    storage_type                = "gp2"
    publicly_accessible         = true
	enabled_cloudwatch_logs_exports = ["error","general"]
    # snapshot_identifier         = "datastore-${var.environment}"
    allow_major_version_upgrade = false
    auto_minor_version_upgrade  = false
    apply_immediately           = true
    maintenance_window          = "sun:02:00-sun:04:00"
    skip_final_snapshot         = true
    # copy_tags_to_snapshot       = "${var.copy_tags_to_snapshot}"
    backup_retention_period     = 7
    backup_window               = "04:00-06:00"
    # tags                        = "${module.label.tags}"
    #final_snapshot_identifier   = "accounts"
  }
  #RDS parameter group(Optional)
  resource "aws_db_parameter_group" "default" {
  name        = "daytrader-param-group"
  description = "Terraform example parameter group for mysql5.6"
  family      = "mysql8.0"
  parameter {
    name  = "character_set_server"
    value = "utf8"
  }
  parameter {
    name  = "character_set_client"
    value = "utf8"
  }
}
 # RDS Instance for Portfolios--------------------- 
 resource "aws_db_instance" "portfolios" {
   name                        = "portfolios"
   identifier                  = "portfolios"
   username                    = "admin"
   password                    = "12345678"
   port                        = "3306"
   engine                      = "mysql"
   engine_version              = "8.0.20"
   instance_class              = "db.t2.micro"
   allocated_storage           = "10"
   storage_encrypted           = false
   vpc_security_group_ids      = [aws_security_group.default.id]
   db_subnet_group_name        = aws_db_subnet_group.datastore.name
   parameter_group_name        = aws_db_parameter_group.default.name
   multi_az                    = false
   storage_type                = "gp2"
   publicly_accessible         = true
   # snapshot_identifier         = "datastore-${var.environment}"
   allow_major_version_upgrade = false
   auto_minor_version_upgrade  = false
   apply_immediately           = true
   maintenance_window          = "sun:02:00-sun:04:00"
   skip_final_snapshot         = true
   # copy_tags_to_snapshot       = "${var.copy_tags_to_snapshot}"
   backup_retention_period     = 7
   backup_window               = "04:00-06:00"
   # tags                        = "${module.label.tags}"
   #final_snapshot_identifier   = "portfolios"
 }
 # RDS Instance for Quotes---------------------
 resource "aws_db_instance" "quotes" {
   name                        = "quotes"
   identifier                  = "quotes"
   username                    = "admin"
   password                    = "12345678"
   port                        = "3306"
   engine                      = "mysql"
   engine_version              = "8.0.20"
   instance_class              = "db.t2.micro"
   allocated_storage           = "10"
   storage_encrypted           = false
   vpc_security_group_ids      = [aws_security_group.default.id]
   db_subnet_group_name        = aws_db_subnet_group.datastore.name
   parameter_group_name        = aws_db_parameter_group.default.name
   multi_az                    = false
   storage_type                = "gp2"
   publicly_accessible         = true
   # snapshot_identifier         = "datastore-${var.environment}"
   allow_major_version_upgrade = false
   auto_minor_version_upgrade  = false
   apply_immediately           = true
   maintenance_window          = "sun:02:00-sun:04:00"
   skip_final_snapshot         = true
   # copy_tags_to_snapshot       = "${var.copy_tags_to_snapshot}"
   backup_retention_period     = 7
   backup_window               = "04:00-06:00"
   # tags                        = "${module.label.tags}"
   #final_snapshot_identifier   = "quotes"
 }