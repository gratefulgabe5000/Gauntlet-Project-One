cmake_minimum_required(VERSION 3.16)
project(GratefulGabe5000)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(hello hello.cpp)

# Set output directory
set_target_properties(hello PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Compiler-specific options
if(MSVC)
    target_compile_options(hello PRIVATE /W3 /EHsc)
else()
    target_compile_options(hello PRIVATE -Wall -Wextra -pedantic)
endif()
