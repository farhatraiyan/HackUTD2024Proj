@echo off

REM Setup Flask API backend
cd api
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
cd ..