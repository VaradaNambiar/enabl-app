#pragma once
#include <string>
#include "crow_all.h"
#include <vector>
#include <sstream>
#include <algorithm>
#include <unordered_set>

using namespace std;

int wordCount(const string& content);

unordered_set<string> keywords(const string& content);

double sentimentAnalysis(const unordered_set<string>& keywords);