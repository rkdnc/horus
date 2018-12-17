const Twit = require('twit')
const chalk = require('chalk')
require('dotenv').config()
const log = console.log

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY || '123',
  consumer_secret: process.env.CONSUMER_SECRET || '123',
  access_token: process.env.ACCESS_TOKEN_KEY || '123',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || '123'

})

module.exports = {
  getTweets: function () {
    T.get('statuses/home_timeline', { count: 20, tweet_mode: 'extended' }, (err, data, response) => {
      if (err) throw err
      data.reverse().forEach(tweet => {
        let tweetText = ''
        // This is for Twitter's API. If a status is retweeted, it will have the full text in
        // a different object than the original tweet.
        if (tweet.hasOwnProperty('retweeted_status')) {
          tweetText += tweet.retweeted_status.full_text
        } else {
          tweetText += tweet.full_text
        }

        // if tweet is more than 140 chars, insert newline for readability
        if (tweetText.length > 140) {
          const index = tweetText.indexOf(' ', 120)
          tweetText = tweetText.slice(0, index) + '\n' + tweetText.slice(index + 1, tweetText.length)
        }
        log(`\n${chalk.gray(`+${'-'.repeat(140)}+`)}
 ${chalk.blue('@')}${chalk.blue(tweet.user.screen_name)}
 ${tweetText}
 RT's: ${chalk.green(tweet.retweet_count)} -- Likes: ${chalk.red(tweet.favorite_count)}
${chalk.gray(`+${'-'.repeat(140)}+`)}`)
        console.log(data)
      })
      // Assign ID to RT/Heart
    })
  }
}
