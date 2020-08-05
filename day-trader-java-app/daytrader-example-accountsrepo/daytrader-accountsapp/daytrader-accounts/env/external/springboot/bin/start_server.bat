@echo off
echo "in start_server.bat"

rem
rem Set the current directory
rem
@echo off
echo "set the current directory %cd%"
set CURRENT_DIRECTORY=%cd%

rem
rem Set the environment
rem
call "%CURRENT_DIRECTORY%\env\external\springboot\bin\setenv.bat"

rem
rem Launch the application
rem
echo "launch the application %DAYTRADER_WAR_ARTIFACTID%-%DAYTRADER_APP_VERSION%.war"
start /MIN "%DAYTRADER_APP_ARTIFACTID%" java -Djavax.net.ssl.trustStore=%DAYTRADER_TRUSTSTORE_LOCATION% -Djavax.net.ssl.trustStorePassword=%DAYTRADER_TRUSTSTORE_PASSWORD% -jar "%CURRENT_DIRECTORY%\target\%DAYTRADER_WAR_ARTIFACTID%-%DAYTRADER_APP_VERSION%.war"

@echo off
echo "end of start_server.bat"

rem exit 0

