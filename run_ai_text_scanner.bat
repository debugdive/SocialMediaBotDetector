@echo off
echo ==============================================
echo Installing requirements (if not already installed)...
echo ==============================================
pip install -r requirements.txt

echo ==============================================
echo Starting Streamlit AI vs Human Text Scanner...
echo ==============================================
streamlit run ai_detector.py
pause
