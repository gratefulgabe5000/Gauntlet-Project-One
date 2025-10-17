@echo off
echo Building C++ project with MSVC...

REM Set up Visual Studio environment
call "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat"

REM Compile the C++ file
cl.exe /std:c++17 /EHsc /W3 hello.cpp /Fe:hello.exe

if %ERRORLEVEL% EQU 0 (
    echo Build successful!
    echo Running the program:
    hello.exe
) else (
    echo Build failed!
)

pause

