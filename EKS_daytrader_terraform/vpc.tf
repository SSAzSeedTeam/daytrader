#
# VPC Resources
#  * VPC
#  * Subnets
#  * Internet Gateway
#  * Route Table
#

resource "aws_vpc" "demo" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = map(
    "Name", "terraform-eks-demo-node",
    "kubernetes.io/cluster/${var.cluster-name}", "shared",
  )
}

resource "aws_subnet" "demo" {
  count = 2

  availability_zone       = data.aws_availability_zones.available.names[count.index]
  cidr_block              = "10.0.${count.index}.0/24"
  map_public_ip_on_launch = true
  vpc_id                  = aws_vpc.demo.id

  tags = map(
    "Name", "terraform-eks-demo-node",
    "kubernetes.io/cluster/${var.cluster-name}", "shared",
  )
}

resource "aws_internet_gateway" "demo" {
  vpc_id = aws_vpc.demo.id

  tags = {
    Name = "terraform-eks-demo"
  }
}

resource "aws_route_table" "demo" {
  vpc_id = aws_vpc.demo.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.demo.id
  }
}

resource "aws_route_table_association" "demo" {
  count = 2

  subnet_id      = aws_subnet.demo.*.id[count.index]
  route_table_id = aws_route_table.demo.id
}
#----------------------------------RDS MYSQL NETWORK CONFIG-------------------

# Create var.az_count public subnets for RDS, each in a different AZ
resource "aws_subnet" "rds" {
  count             = 2
  cidr_block        = cidrsubnet(aws_vpc.demo.cidr_block, 8, length(data.aws_availability_zones.available.names)+ count.index)
  map_public_ip_on_launch = true
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  vpc_id            = aws_vpc.demo.id
}


resource "aws_db_subnet_group" "datastore" {
  name       = "datastore-daytrader"
  subnet_ids = aws_subnet.rds.*.id
}


resource "aws_route_table" "rds_public" {
  vpc_id = aws_vpc.demo.id
}

# Route the public subnet traffic through the IGW
resource "aws_route" "rds_internet_access" {
  route_table_id         = aws_route_table.rds_public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.demo.id
}

resource "aws_route_table_association" "rds_public" {
  count          = 2
  subnet_id      = element(aws_subnet.rds.*.id, count.index)
  route_table_id = aws_route_table.rds_public.id
}
#-----------------------------------END-----------------------------------------------------