#pragma once
#include <string>
#include "crow_all.h"
#include <vector>
#include <sstream>
#include <algorithm>
#include <set>

using namespace std;

int wordCount(const string& content);

set<string> keywords(const string& content);

double sentimentAnalysis(const set<string>& keywords);