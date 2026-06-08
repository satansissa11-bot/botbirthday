@echo off
echo Installing Birthday Card Automation Service as Windows Service...
echo.

REM Check if node-windows is installed
npm list node-windows >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing node-windows...
    npm install node-windows --save
)

echo Creating Windows Service...
node install-service.js

echo.
echo Service installation complete.
echo To start the service, run: net start BirthdayAutomation
echo To stop the service, run: net stop BirthdayAutomation
echo To uninstall the service, run: node uninstall-service.js
pause
