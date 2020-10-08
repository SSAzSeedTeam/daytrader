Use the docker-compose-new-build.yml file during your development

Use the below commands to create your docker image.  The version number is '0'.  
The version number is kept zero during development, so as to not interfere with other versions.
Incase you accidentally push to docker hub, there is no risk with a '0' version.
Note:- the docker-build.sh script in each of the module folder creates the docker image with '0' as version


cd daytrader-accounts             ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..
cd daytrader-gateway              ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..
cd daytrader-portfolios           ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..
cd daytrader-quotes               ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..
cd daytrader-web                  ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..
cd daytrader-report-generator     ; chmod 755 *sh ; dos2unix *.sh ; sudo ./docker-build.sh ; cd ..

