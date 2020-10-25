md all_combined
copy "pods\accounts\deployment.yaml"                        "all_combined\accounts_deployment.yaml"
copy "pods\accounts\service.yaml"                           "all_combined\accounts_service.yaml"
copy "pods\gateway\deployment.yaml"                         "all_combined\gateway_deployment.yaml"
copy "pods\gateway\service.yaml"                            "all_combined\gateway_service.yaml"
copy "pods\portfolios\deployment.yaml"                      "all_combined\portfolios_deployment.yaml"
copy "pods\portfolios\service.yaml"                         "all_combined\portfolios_service.yaml"
copy "pods\quotes\deployment.yaml"                          "all_combined\quotes_deployment.yaml"
copy "pods\quotes\service.yaml"                             "all_combined\quotes_service.yaml"
copy "pods\report-generator\deployment.yaml"                "all_combined\report-generator_deployment.yaml"
copy "pods\scdf-trade-generator\deployment.yaml"            "all_combined\scdf-trade-generator_deployment.yaml"
copy "pods\scdf-trade-generator\service.yaml"               "all_combined\scdf-trade-generator_service.yaml"
copy "pods\scdf-trade-processor\deployment.yaml"            "all_combined\scdf-trade-processor_deployment.yaml"
copy "pods\scdf-trade-processor\service.yaml"               "all_combined\scdf-trade-processor_service.yaml"
copy "pods\scdf-trade-validation\deployment.yaml"           "all_combined\scdf-trade-validation_deployment.yaml"
copy "pods\scdf-trade-validation\service.yaml"              "all_combined\scdf-trade-validation_service.yaml"
copy "pods\trade-consumer\deployment.yaml"                  "all_combined\trade-consumer_deployment.yaml"
copy "pods\trade-consumer\service.yaml"                     "all_combined\trade-consumer_service.yaml"
copy "pods\trade-producer\deployment.yaml"                  "all_combined\trade-producer_deployment.yaml"
copy "pods\trade-producer\service.yaml"                     "all_combined\trade-producer_service.yaml"
copy "pods\web\deployment.yaml"                             "all_combined\web_deployment.yaml"
copy "pods\web\service.yaml"                                "all_combined\web_service.yaml"
copy "pods\web-react-npm\deployment.yaml"                   "all_combined\web-react-npm_deployment.yaml"
copy "pods\web-react-npm\service.yaml"                      "all_combined\web-react-npm_service.yaml"
copy "pods\web-react-static\deployment.yaml"                "all_combined\web-react-static_deployment.yaml"
copy "pods\web-react-static\service.yaml"                   "all_combined\web-react-static_service.yaml"
copy "pods\web-mfe-accounts-npm\deployment.yaml"            "all_combined\web-mfe-accounts-npm_deployment.yaml"
copy "pods\web-mfe-accounts-npm\service.yaml"               "all_combined\web-mfe-accounts-npm_service.yaml"
copy "pods\web-mfe-container-npm\deployment.yaml"           "all_combined\web-mfe-container-npm_deployment.yaml"
copy "pods\web-mfe-container-npm\service.yaml"              "all_combined\web-mfe-container-npm_service.yaml"
copy "pods\web-mfe-portfolios-npm\deployment.yaml"          "all_combined\web-mfe-portfolios-npm_deployment.yaml"
copy "pods\web-mfe-portfolios-npm\service.yaml"             "all_combined\web-mfe-portfolios-npm_service.yaml"
copy "pods\web-mfe-quotes-npm\deployment.yaml"              "all_combined\web-mfe-quotes-npm_deployment.yaml"
copy "pods\web-mfe-quotes-npm\service.yaml"                 "all_combined\web-mfe-quotes-npm_service.yaml"


copy "configmaps-mysql\config-map-accounts-db-mysql.yaml"   "all_combined\config-map-accounts-db-mysql.yaml"
copy "configmaps-mysql\config-map-portfolios-db-mysql.yaml" "all_combined\config-map-portfolios-db-mysql.yaml"
copy "configmaps-mysql\config-map-quotes-db-mysql.yaml"     "all_combined\config-map-quotes-db-mysql.yaml"
copy "configmaps-mysql\config-map-service-urls.yaml"        "all_combined\config-map-service-urls.yaml"

