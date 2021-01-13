# Fetch AZs in the current region
data "aws_availability_zones" "available" {
}

#Create VPC and enable DNS support
resource "aws_vpc" "main" {
  cidr_block = "172.17.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

# Create var.az_count private subnets for cluster, each in a different AZ
resource "aws_subnet" "private" {
  count             = var.az_count
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  vpc_id            = aws_vpc.main.id
}

# Create var.az_count public subnets for cluster, each in a different AZ
resource "aws_subnet" "public" {
  count                   = var.az_count
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, var.az_count + count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  vpc_id                  = aws_vpc.main.id
  map_public_ip_on_launch = true
}

# Create var.az_count public subnets for RDS, each in a different AZ
resource "aws_subnet" "rds" {
  count             = var.az_count
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, length(data.aws_availability_zones.available.names)+ count.index)
  map_public_ip_on_launch = true
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  vpc_id            = aws_vpc.main.id
}


resource "aws_db_subnet_group" "datastore" {
  name       = "datastore-daytrader"
  #count             = "${var.az_count}"
  #subnet_ids      = [element(aws_subnet.datastore_rds.*.id, count.index)]
  subnet_ids = aws_subnet.rds.*.id
}


resource "aws_route_table" "rds_public" {
  vpc_id = aws_vpc.main.id
}

# Route the public subnet traffic through the IGW
resource "aws_route" "rds_internet_access" {
  route_table_id         = aws_route_table.rds_public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

resource "aws_route_table_association" "rds_public" {
  count          = var.az_count
  subnet_id      = element(aws_subnet.rds.*.id, count.index)
  route_table_id = aws_route_table.rds_public.id
}

# Internet Gateway for the public subnet
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Create main route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

# Route the public subnet traffic through the IGW
resource "aws_route" "internet_access" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

#Associate route table with public subnet
resource "aws_route_table_association" "public" {
  count          = var.az_count
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.public.id
}

# Create a NAT gateway with an Elastic IP for each private subnet to get internet connectivity
resource "aws_eip" "gw" {
  count      = var.az_count
  vpc        = true
  depends_on = [aws_internet_gateway.gw]
}

resource "aws_nat_gateway" "gw" {
  count         = var.az_count
  subnet_id     = element(aws_subnet.public.*.id, count.index)
  allocation_id = element(aws_eip.gw.*.id, count.index)
  depends_on = [aws_internet_gateway.gw]
}

# Create a new route table for the private subnets, make it route non-local traffic through the NAT gateway to the internet
resource "aws_route_table" "private" {
  count  = var.az_count
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = element(aws_nat_gateway.gw.*.id, count.index)
  }
  
}

# Explicitly associate the newly created route tables to the private subnets (so they don't default to the main route table)
resource "aws_route_table_association" "private" {
  count          = var.az_count
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = element(aws_route_table.private.*.id, count.index)
}
