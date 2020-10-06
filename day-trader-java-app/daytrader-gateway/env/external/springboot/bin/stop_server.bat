@echo off
echo "in stop_server.bat"

rem
rem Set the current directory
rem
@echo off
echo "set the current directory %cd%"
set CURRENT_DIRECTORY=%cd%
call "%CURRENT_DIRECTORY%\env\external\springboot\bin\setenv.bat"

rem
rem Stop the application
rem
@echo off
echo "stop the application %DAYTRADER_WAR_ARTIFACTID%"
taskkill /FI "WindowTitle eq %DAYTRADER_APP_ARTIFACTID%*" /T /F

@echo off
echo "end of stop_server.bat"

rem exit 0

