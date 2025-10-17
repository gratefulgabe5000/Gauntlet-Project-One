#include <iostream>
#include <string>
#include <vector>

int main() {
    std::cout << "Hello, C++ World!" << std::endl;

    // Test modern C++ features
    std::vector<std::string> languages = {"C++", "Python", "JavaScript", "TypeScript"};

    std::cout << "Supported languages in this workspace:" << std::endl;
    for (const auto& lang : languages) {
        std::cout << "- " << lang << std::endl;
    }

    // Test C++17 features
    auto [first, second] = std::make_pair(42, "answer");
    std::cout << "C++17 structured binding: " << first << " is the " << second << std::endl;

    return 0;
}

