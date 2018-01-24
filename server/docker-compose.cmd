@echo off
@FOR /f "tokens=*" %%i IN ('docker-machine env') DO @%%i
call "C:\Program Files\Docker Toolbox\docker-compose.exe" %*