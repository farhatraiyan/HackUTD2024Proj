@echo off

REM Setup Flask backend
cd server
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt