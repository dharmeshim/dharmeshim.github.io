@echo off
echo 🚀 Starting deployment process...

REM Build the project
echo 📦 Building the project...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    
    REM Deploy to GitHub Pages
    echo 🌐 Deploying to GitHub Pages...
    call npm run deploy
    
    if %ERRORLEVEL% EQU 0 (
        echo 🎉 Deployment successful!
        echo 🌍 Your site should be available at: https://dharmeshim.github.io
        echo ⏰ It may take a few minutes for changes to appear.
    ) else (
        echo ❌ Deployment failed!
        exit /b 1
    )
) else (
    echo ❌ Build failed!
    exit /b 1
)

pause
