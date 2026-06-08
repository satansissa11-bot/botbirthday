@echo off
echo Uninstalling Birthday Card Automation Service...
echo.

REM Stop the service first
net stop BirthdayAutomation >nul 2>&1

REM Uninstall the service
node uninstall-service.js

echo.
echo Service uninstalled successfully.
pause
