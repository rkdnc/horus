const config = require('../config.json')
const Twit = require('twit')

const T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token_key,
  access_token_secret: config.access_token_secret
})

module.exports = {
  getTweets : function() {
    T.get('statuses/home_timeline', { count: 1 }, (err, data, response) => console.log(data))
  }
}