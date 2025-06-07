// enable_app.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string.h>
//#include <boost/asio.hpp>
#include "core_logic.h"
#include "crow_all.h"

using namespace std;

int main()
{
	crow::SimpleApp app;

	CROW_ROUTE(app, "/analyse_post").methods("POST"_method)([](const crow::request& req)
		{
			crow::json::rvalue x;
			try
			{
				x = crow::json::load(req.body);
			}
			catch (const std::runtime_error& e)
			{
				return crow::response(crow::status::BAD_REQUEST,  e.what());
			}
			if (!x.count("body") || (x["body"].t() != crow::json::type::String))
			{
				return crow::response(crow::status::BAD_REQUEST, "JSON must contain a 'body' string field.");
			}

			string bodyContent = x["body"].s();
			int words = wordCount(bodyContent);
			set<string> allKeywords = keywords(bodyContent);
			double sentiment = sentimentAnalysis(allKeywords);

			crow::json::wvalue::list keywordsJson;
			std::ranges::for_each(allKeywords, [&keywordsJson](const string& word)
				{
					keywordsJson.push_back(word);
				});
			crow::json::wvalue response;
			response["wordCount"] = words;
			response["keywords"] = std::move(keywordsJson);
			response["sentiments"] = sentiment;

			return crow::response(crow::status::OK, response.dump());
		});

	CROW_ROUTE(app, "/health")([]() {
		return crow::response(crow::status::OK, "C++ Analysis Service is running!");
		});

	app.port(8080).multithreaded().run();
}
// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
