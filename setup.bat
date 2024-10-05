@echo off

REM Setup Flask API backend
cd flask_app
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt