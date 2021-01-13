# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "daytrader_log_group" {
  name              = "/ecs/cb-app"
  retention_in_days = 30

  tags = {
    Name = "cb-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "daytrader_log_stream" {
  name           = "daytrader-log-stream"
  log_group_name = aws_cloudwatch_log_group.daytrader_log_group.name
}