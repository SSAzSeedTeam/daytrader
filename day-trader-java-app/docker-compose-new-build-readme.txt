#Use the docker-compose-new-build.yaml file during your development
#
#Use the below commands to create your docker image.  The version number is '0'.  
#The version number is kept zero during development, so as to not interfere with other versions.
#Incase you accidentally push to docker hub, there is no risk with a '0' version.
#Note:- the docker-build.sh script in each of the module folder creates the docker image with '0' as version
#

cd daytrader-accounts                ; sudo ./docker-build.sh ; cd ..
cd daytrader-gateway                 ; sudo ./docker-build.sh ; cd ..
cd daytrader-portfolios              ; sudo ./docker-build.sh ; cd ..
cd daytrader-quotes                  ; sudo ./docker-build.sh ; cd ..
cd daytrader-web                     ; sudo ./docker-build.sh ; cd ..
cd daytrader-report-generator        ; sudo ./docker-build.sh ; cd ..
cd daytrader-onprem-exchange-rate    ; sudo ./docker-build.sh ; cd ..
cd daytrader-trade-consumer          ; sudo ./docker-build.sh ; cd ..
cd daytrader-trade-producer          ; sudo ./docker-build.sh ; cd ..
cd daytrader-auth-server			 ; sudo ./docker-build.sh ; cd ..

#After testing your new changes, you can re-tag them appropriately and push to dockerhub with below commands
#
#
#sudo docker tag daytrader-accounts:0                tnshibu/daytrader-accounts:1.7
#sudo docker tag daytrader-gateway:0                 tnshibu/daytrader-gateway:1.7
#sudo docker tag daytrader-portfolios:0              tnshibu/daytrader-portfolios:1.7
#sudo docker tag daytrader-quotes:0                  tnshibu/daytrader-quotes:1.7
#sudo docker tag daytrader-web:0                     tnshibu/daytrader-web:1.7
#sudo docker tag daytrader-report-generator:0        tnshibu/daytrader-report-generator:1.7
#sudo docker tag daytrader-onprem-exchange-rate:0    tnshibu/daytrader-onprem-exchange-rate:1.7
#sudo docker tag daytrader-trade-consumer:0          tnshibu/daytrader-trade-consumer:1.7
#sudo docker tag daytrader-trade-producer:0          tnshibu/daytrader-trade-producer:1.7
#
#sudo docker push tnshibu/daytrader-accounts:1.7
#sudo docker push tnshibu/daytrader-gateway:1.7
#sudo docker push tnshibu/daytrader-portfolios:1.7
#sudo docker push tnshibu/daytrader-quotes:1.7
#sudo docker push tnshibu/daytrader-web:1.7
#sudo docker push tnshibu/daytrader-report-generator:1.7
#sudo docker push tnshibu/daytrader-onprem-exchange-rate:1.7
#sudo docker push tnshibu/daytrader-trade-consumer:1.7
#sudo docker push tnshibu/daytrader-trade-producer:1.7
#
