const Twit = require('twit')
require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

module.exports = {
  getTweets: function () {
    T.get('statuses/home_timeline', { count: 1 }, (err, data, response) => {
      // Need to shape each tweet to be listed
      // Will start with 15 most recent tweets I think
      // Needs to not exit the script once complete.
      console.log(data[0].text)})
  }
}
