#!/usr/bin/env node


const chalk = require('chalk')
const fs = require('fs')

const horus = require('commander')
const inquirer = require('inquirer')
require('dotenv').config()
const twitter = require('../lib/twitter')


// Helpers
const help = chalk.yellow
const logError = chalk.red.underline
const log = console.log



horus
  .command('setup')
  .description('Set up Twitter API keys for Horus to run.')
  .action(() => {
    inquirer.prompt([
        {
        type:'input',
        name:'consumer_key',
        default:'',
        message: help('What is your Consumer Key? ')
    },
    {
        type:'input',
        name:'consumer_secret',
        default:'',
        message: help('What is your Consumer Secret? ')
    },
    {
        type:'input',
        name:'access_token_key',
        default:'',
        message: help('What is your Access Token Key? ')
    },
    {
        type:'input',
        name:'access_token_secret',
        default:'',
        message: help('What is your Access Token Secret? ')
    }]).then(result => {
        let keys = {
         consumer_key: result.consumer_key,
          consumer_secret: result.consumer_secret,
          access_token: result.access_token_key,
          access_token_secret: result.access_token_secret
        }
        let data = JSON.stringify(keys)
        fs.writeFile(`${__dirname}/../config.json`, data, err => {
            if (err) throw err
        })
        log(help('Setup is complete. You are now able to access Twitter.'))
    })
  })

horus
  .command('timeline [num]')
  .description('Read your home timeline. Optional argument allowed for more or less tweets to be shown, defaulting to 10.')
  .action( tweets => {
    switch(typeof tweets) {
        case 'number':
            twitter.getTweets(tweets)
            break
        case 'string':
            if ( tweets.length > 0 ) {
                log(logError('You did not enter a number of tweets to read.'))
            }
            break
        default: 
            twitter.getTweets(10)
    }
  })

horus
  .command('post <text>')
  .description('Post a tweet.')
  .action(text => {
      if(text.length > 280) {
          log(logError('Your tweet is too long. Try to keep it under 280 characters!'))
      } else {
          twitter.postTweet(text)
      }
  })

horus
  .command('follow <username>')
  .description('Follows the specific user.')
  .action( username => {
    twitter.followUser(username)
  })

horus
  .command('unfollow <username>')
  .description('Unfollows the specific user.')
  .action(username => {
    twitter.unfollowUser(username)
  })

horus
  .command('d <username> <message>')
  .description('Direct message a user')
  .action((username, message) => {
    twitter.directMessage(username, message)
  })

horus
  .command('rt <username>')
  .description('Retweets that username\'s last tweet.')
  .action((username) => {
    twitter.retweet(username)
  })

horus
  .command('like <username>')
  .description('Likes that user\'s last tweet.')
  .action(username => {
    twitter.likeTweet(username)
  })

horus
  .command('stats <username>')
  .description('Returns that user\'s bio, number of followers and number of users they are following.')
  .action(username => {
    twitter.stats(username)
  })

horus
  .command('search <query> [count]')
  .description('Searches for a query')
  .action((query, count) => {
    twitter.search(query, count)
  })


horus.parse(process.argv)