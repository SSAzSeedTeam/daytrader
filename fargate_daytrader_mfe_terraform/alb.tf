#Application load balancer for daytrader web-----------------------------

resource "aws_lb" "daytrader-web1" {
  name            = "daytrader-web-load-balancer"
  subnets         = aws_subnet.public.*.id
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "web-target2" {
  name        = "daytrader-target-group-web2"
  port        =  3001
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "60"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "daytrader-web-mfe1" {
  load_balancer_arn = aws_lb.daytrader-web1.id
  port              = 3001
  protocol          = "HTTP"

  default_action {
   target_group_arn = aws_alb_target_group.web-target2.id
    type             = "forward"
  }
  
  
}
#----------------------GATEWAY---------------------------------------------

resource "aws_lb" "daytrader-gateway" {
  name            = "daytrader-gteway-load-balancer"
  subnets         = aws_subnet.public.*.id
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "gateway-target6" {
  name        = "daytrader-target-group-gateway6"
  port        =  2443
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "60"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "daytrader-gateway6" {
  load_balancer_arn = aws_lb.daytrader-gateway.id
  port              = 2443
  protocol          = "HTTP"

  default_action {
   target_group_arn = aws_alb_target_group.gateway-target6.id
    type             = "forward"
  }
  
# default_action {
#   type = "redirect"
# 
#   redirect {
#     port        = 443
#     protocol    = "HTTPS"
#     status_code = "HTTP_301"
#   }
#  }
#resource "aws_alb_listener" "https" {
#  load_balancer_arn = aws_lb.daytrader.id
#  port              = 443
#  protocol          = "HTTPS"
# 
#  ssl_policy        = "ELBSecurityPolicy-2016-08"
#  certificate_arn   = var.alb_tls_cert_arn
# 
#  default_action {
#    target_group_arn = aws_alb_target_group.app1.id
#    type             = "forward"
#  }
#}
  
}
#-------------------------------------------------------------------



#------------------accounts changes start---------------------------

resource "aws_lb" "daytrader-accounts" {
  name            = "daytrader-accounts-load-bal"
  subnets         = aws_subnet.public.*.id
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
}


resource "aws_alb_target_group" "accounts-target1" {
  name        = "daytrader-target-grp-accounts1"
  port        =  3002
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "60"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "daytrader-http-accounts1" {
  load_balancer_arn = aws_lb.daytrader-accounts.id
  port              = 3002
  protocol          = "HTTP"

  default_action {
   target_group_arn = aws_alb_target_group.accounts-target1.id
    type             = "forward"
  }
  
  
}



#--------------------------------END------------------------------------


#------------------portfolios changes start---------------------------

resource "aws_lb" "daytrader-portfolios" {
  name            = "daytrader-portfolios-load-bal"
  subnets         = aws_subnet.public.*.id
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
}


resource "aws_alb_target_group" "portfolios-target1" {
  name        = "daytrader-target-grp-portfolios1"
  port        =  3003
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "60"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "daytrader-portfolios1" {
  load_balancer_arn = aws_lb.daytrader-portfolios.id
  port              = 3003
  protocol          = "HTTP"

  default_action {
   target_group_arn = aws_alb_target_group.portfolios-target1.id
    type             = "forward"
  }
  
  
}
#--------------------------------END------------------------------------


#------------------portfolios changes start---------------------------

resource "aws_lb" "daytrader-quotes" {
  name            = "daytrader-quotes-load-bal"
  subnets         = aws_subnet.public.*.id
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
}


resource "aws_alb_target_group" "quotes-target1" {
  name        = "daytrader-target-grp-quotes1"
  port        =  3004
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "60"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "daytrader-http-quotes2" {
  load_balancer_arn = aws_lb.daytrader-quotes.id
  port              = 3004
  protocol          = "HTTP"

  default_action {
   target_group_arn = aws_alb_target_group.quotes-target1.id
    type             = "forward"
  }
  
  
}
#--------------------------------END------------------------------------

#default_action {
#   type = "redirect"
# 
#   redirect {
#     port        = 443
#     protocol    = "HTTPS"
#     status_code = "HTTP_301"
#   }
#  }
#resource "aws_alb_listener" "https" {
#  load_balancer_arn = aws_lb.daytrader.id
#  port              = 443
#  protocol          = "HTTPS"
# 
#  ssl_policy        = "ELBSecurityPolicy-2016-08"
#  certificate_arn   = var.alb_tls_cert_arn
# 
#  default_action {
#    target_group_arn = aws_alb_target_group.app1.id
#    type             = "forward"
#  }
#}