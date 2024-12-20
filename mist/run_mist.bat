@echo off
cd C:\Users\abero\Downloads\mist-v2_gui_free_version\mist-v2

set VENV_DIR=venv
set PYTHON="%~dp0/Pysetter/%VENV_DIR%/python"

cd Pysetter
%PYTHON% update_env.py
if %ERRORLEVEL% == 0 goto :run_mist
goto :error

:run_mist
cd ../src
%PYTHON% mist-webui.py
pause
exit /b

:error
echo.
echo Launch unsuccessful. Exiting.
pause
