const Twit = require('twit')
const chalk = require('chalk')
require('dotenv').config()
const log = console.log

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET

})

module.exports = {
  getTweets: tweets => {
    T.get('statuses/home_timeline', { count: tweets, tweet_mode: 'extended' }, (err, data, response) => {
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
      })
    })
  },
  postTweet: text => {
    T.post('statuses/update', { status: text }, (err, data, response) => {
      if (err) throw err
      log(chalk.yellow(`Your tweet was posted! \n${text}`))
    })
  },
  followUser: username => {
    T.post('friendships/create', {screen_name: username}, (err, data, response) => {
      if (err) {
        log(chalk.red(err))
      } else {
      log(chalk.yellow(`You are now following ${username}`))
      }
    })
  },
  unfollowUser: username => {
    T.post('friendships/destroy', {screen_name: username}, (err, data, response) => {
      if (err) {
        log(chalk.red(err))
      } else {
        log(chalk.yellow(`You have unfollowed ${username}`))
      }
    })
  },
  directMessage: (username, message) => {
      T.get('users/lookup', {screen_name: username})
      .catch(err => {
        log(chalk.red(err))
      })
      .then(result => {
      const id = result.data[0].id_str
      const params = { "content-type": "application/json",
      "event": {
        "type": "message_create",
        "message_create": {
          "target": {
            "recipient_id": id
          },
          "message_data": {
            "text": message
          }
        }
      }
    } 
     T.post('direct_messages/events/new', params, (err, data, response) => {
        if (err) {
          log(chalk.red(err))
        } else {
          log(chalk.yellow('Message sent.'))
        }
      })
    })
  },
  retweet: username => {
    T.get('users/show', {screen_name: username})
    .catch(err => log(chalk.red(err)))
    .then(result => {
      T.post('statuses/retweet', {id: result.data.status.id_str}, (err, data, response) => log(chalk.yellow('Retweet Successful.')))
    })
  },
  likeTweet: username => {
    T.get('users/show', {screen_name: username})
    .catch(err => log(chalk.red(err)))
    .then(result => {
      T.post('favorites/create', {id: result.data.status.id_str}, (err, data, response) => log(chalk.yellow('Tweet liked.')))
    })
  },
  stats: username => {
    T.get('users/show', {screen_name: username}, (err, data, response) => {
      log(`${'-'.repeat(70)}\n @${data.screen_name} | Followers: ${data.followers_count} | Following: ${data.friends_count}  \n ${data.description} \n Latest Tweet: \n ${data.status.text} \n ${'-'.repeat(70)}`)
    })
  },
  search: (query, count) => {
    T.get('search/tweets', {q: query, count: count || 10 }, (err, data, response) => {
      if (err) {
        log(chalk.red(err))
      } else {
        data.statuses.forEach(tweet => {
          log(` ${tweet.user.screen_name} \n ${tweet.text}`)
        })
      }
    })
  }
}
