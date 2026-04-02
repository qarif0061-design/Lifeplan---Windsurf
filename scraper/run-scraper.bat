@echo off
echo ========================================
echo TDP Community Email Scraper
echo ========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting scraper...
echo.
node tdp-scraper.js
echo.
echo Scraping complete! Check the 'results' folder.
echo.
pause
