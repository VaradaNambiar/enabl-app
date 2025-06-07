#include "core_logic.h"

int word_count(const string& content)
{
	stringstream ss(content);
	string word;
	int count = 0;
	while(ss >> word)
	{
		count++;
	}

	return count;
}

unordered_set<string> keywords(const string& content)
{
	unordered_set<string> key_words;
	const vector<string> stop_words = { "a","about","above","across","after","afterwards","again","against","all","almost","alone","along","also","although","always","am","among","amount","an","and","another","any","anyhow","anyone","anything","anyway","anywhere","are","around","as","at","back","be","became","because","become","becomes","been","being","below","beside","besides","between","beyond","both","but","by","came","can","cant","cannot","come","could","couldnt","describe","did","didnt","do","does","doesnt","doing","done","dont","due","during","each","either","else","elsewhere","enough","etc","even","ever","every","everyone","everything","everywhere","few","for","from","further","get","give","goes","going","had","happen","has","hasnt","have","having","here","how","however","i","if","ill","im","in","into","is","isnt","it","its","ive","just","keep","let","like","made","make","many","may","me","mean","might","mine","more","most","mostly","much","name","next","no","nobody","not","nothing","now","of","once","only","onto","or","other","others","otherwise","our","over","per","perhaps","please","put","rather","re","really","same","say","see","seem","seemed","seeming","seems","several","should","show","side","since","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","take","tell","than","that","the","then","their","them","then","there","these","they","thing","this","those","through","throughout","to","together","too","try","un","up","upon","us","use","used","uses","very","want","was","way","we","well","were","what","whatever","when","where","wherever","whether","which","who","whoever","whole","whom","whose","why","will","with","within","without","wont","would","you","your","youre","yours","yourself" };
	std::stringstream ss(content);
	string word;
	while (ss >> word)
	{
		transform(word.begin(), word.end(), word.begin(), ::tolower);
		word.erase(std::remove_if(word.begin(), word.end(), ::ispunct), word.end());

		if (!word.empty())
		{
			key_words.insert(word);
		}
	}

	return key_words;
}

double sentimentAnalysis(const unordered_set<string>& keywords)
{
	double score = 0.;
	const vector<string> positive_words = { "good", "great","excellent" };
	const vector<string> negative_words = { "bad", "sad", "terrible" };

	std::set<string> common_words;
	std::set_intersection(keywords.begin(), keywords.end(), positive_words.begin(), positive_words.end(), common_words.begin());
	score += (0.5 * common_words.size());
	common_words.clear();
	std::set_intersection(keywords.begin(), keywords.end(), negative_words.begin(), negative_words.end(), common_words.begin());
	score -= (0.5 * common_words.size());

	score = (score > 1 ? 1 : (score < -1))
		return  std::min(1.0, std::max(-1.0, score));
}