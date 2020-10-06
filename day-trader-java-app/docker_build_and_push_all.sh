cd /projects/daytrader/day-trader-java-app/daytrader-accounts      ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh
cd /projects/daytrader/day-trader-java-app/daytrader-gateway       ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh
cd /projects/daytrader/day-trader-java-app/daytrader-portfolios    ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh
cd /projects/daytrader/day-trader-java-app/daytrader-quotes        ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh
cd /projects/daytrader/day-trader-java-app/daytrader-web           ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh


docker images

sudo docker tag daytrader-accounts:1.0            tnshibu/daytrader-accounts:1.5
sudo docker tag daytrader-gateway:1.0             tnshibu/daytrader-gateway:1.5
sudo docker tag daytrader-portfolios:1.0          tnshibu/daytrader-portfolios:1.5
sudo docker tag daytrader-quotes:1.0              tnshibu/daytrader-quotes:1.5
sudo docker tag daytrader-web:1.0                 tnshibu/daytrader-web:1.5


sudo docker push tnshibu/daytrader-accounts:1.5
sudo docker push tnshibu/daytrader-gateway:1.5
sudo docker push tnshibu/daytrader-portfolios:1.5
sudo docker push tnshibu/daytrader-quotes:1.5
sudo docker push tnshibu/daytrader-web:1.5

