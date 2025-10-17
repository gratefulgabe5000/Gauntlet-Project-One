@echo off
echo Building C++ project...

REM Create build directory
if not exist build mkdir build
cd build

REM Configure with CMake
cmake .. -G "Visual Studio 17 2022" -A x64

REM Build the project
cmake --build . --config Release

echo Build complete!
echo Executable location: build\bin\Release\hello.exe
pause

