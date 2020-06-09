var Twit = require('twit');

require(`dotenv`).config();

const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,

    timeout_ms: 60*1000,

});

console.log('Bot running...');

function BotInit() {
    var query = {
        q: "#comunista",
        result_type: "recent"
    }

    Bot.get('search/tweets', query, BotGotLastTweet);

    function BotGotLastTweet (error, data, response) {
        if(error) {
            console.log('Bot não pôde achar o último tweet. ' + error);
        }
        else {
            var id = {
                id: data.statuses[0].id_str
            }

            Bot.post('statuses/retweet/:id', id, BotRetweeted);

            function BotRetweeted(error, response) {
                if(error) {
                    console.log('Bot não pôde retweetar. ' + error);
                }
                else {
                    console.log('Bot retweetou: ' + id.id);
                }
            }
        }
    }
}

setInterval(BotInit, 30*60*1000);

BotInit();