cd daytrader-accounts                ; sudo ./docker-build.sh ; cd ..
cd daytrader-gateway                 ; sudo ./docker-build.sh ; cd ..
cd daytrader-portfolios              ; sudo ./docker-build.sh ; cd ..
cd daytrader-quotes                  ; sudo ./docker-build.sh ; cd ..
cd daytrader-web                     ; sudo ./docker-build.sh ; cd ..
cd daytrader-report-generator        ; sudo ./docker-build.sh ; cd ..
cd daytrader-onprem-exchange-rate    ; sudo ./docker-build.sh ; cd ..
cd daytrader-trade-consumer          ; sudo ./docker-build.sh ; cd ..
cd daytrader-trade-producer          ; sudo ./docker-build.sh ; cd ..
cd daytrader-scdf-trade-generator    ; sudo ./docker-build.sh ; cd ..
cd daytrader-scdf-trade-processor    ; sudo ./docker-build.sh ; cd ..
cd daytrader-scdf-trade-validation   ; sudo ./docker-build.sh ; cd ..

sudo docker images

