mkdir pods_combined
cp "accounts/deployment.yaml"                        "pods_combined/accounts_deployment.yaml"
cp "accounts/service.yaml"                           "pods_combined/accounts_service.yaml"
cp "gateway/deployment.yaml"                         "pods_combined/gateway_deployment.yaml"
cp "gateway/service.yaml"                            "pods_combined/gateway_service.yaml"
cp "portfolios/deployment.yaml"                      "pods_combined/portfolios_deployment.yaml"
cp "portfolios/service.yaml"                         "pods_combined/portfolios_service.yaml"
cp "quotes/deployment.yaml"                          "pods_combined/quotes_deployment.yaml"
cp "quotes/service.yaml"                             "pods_combined/quotes_service.yaml"
cp "report-generator/deployment.yaml"                "pods_combined/report-generator_deployment.yaml"
cp "scdf-trade-generator/deployment.yaml"            "pods_combined/scdf-trade-generator_deployment.yaml"
cp "scdf-trade-generator/service.yaml"               "pods_combined/scdf-trade-generator_service.yaml"
cp "scdf-trade-processor/deployment.yaml"            "pods_combined/scdf-trade-processor_deployment.yaml"
cp "scdf-trade-processor/service.yaml"               "pods_combined/scdf-trade-processor_service.yaml"
cp "scdf-trade-validation/deployment.yaml"           "pods_combined/scdf-trade-validation_deployment.yaml"
cp "scdf-trade-validation/service.yaml"              "pods_combined/scdf-trade-validation_service.yaml"
cp "trade-consumer/deployment.yaml"                  "pods_combined/trade-consumer_deployment.yaml"
cp "trade-consumer/service.yaml"                     "pods_combined/trade-consumer_service.yaml"
cp "trade-producer/deployment.yaml"                  "pods_combined/trade-producer_deployment.yaml"
cp "trade-producer/service.yaml"                     "pods_combined/trade-producer_service.yaml"
cp "web/deployment.yaml"                             "pods_combined/web_deployment.yaml"
cp "web/service.yaml"                                "pods_combined/web_service.yaml"
cp "web-react-npm/deployment.yaml"                   "pods_combined/web-react-npm_deployment.yaml"
cp "web-react-npm/service.yaml"                      "pods_combined/web-react-npm_service.yaml"
cp "web-react-static/deployment.yaml"                "pods_combined/web-react-static_deployment.yaml"
cp "web-react-static/service.yaml"                   "pods_combined/web-react-static_service.yaml"
