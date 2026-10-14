@echo off
echo ==============================================
echo Installing requirements (if not already installed)...
echo ==============================================
pip install -r requirements.txt

echo ==============================================
echo Starting Instagram Bot Detector Backend...
echo ==============================================
python app.py
pause
