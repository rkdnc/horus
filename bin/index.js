#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const horus = require('commander')
const inquirer = require('inquirer')
require('dotenv').config()
const twitter = require('../lib/twitter')


// Helpers
const clearConsole = process.stdout.write('\033c') // clears console to run program
const help = chalk.yellow
const logError = chalk.red.underline
const log = console.log

if ( fs.existsSync(`${__dirname}/../.env`) === false ) {
  log(chalk.red.bold('Horus is not properly configured. Please run the \'init\' command.\n'))
}

horus
  .command('setup')
  .alias('-s')
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
        let keys = `CONSUMER_KEY=${result.consumer_key}\nCONSUMER_SECRET=${result.consumer_secret}\nACCESS_TOKEN_KEY=${result.access_token_key}\nACCESS_TOKEN_SECRET=${result.access_token_secret}`
        fs.writeFile(`${__dirname}/../.env`, keys, err => {
            if (err) throw err
        })
        log(help('Setup is complete. You are now able to access Twitter.'))
    })
  })

// Twitter timeline
horus
  .command('timeline [num]')
  .alias('-t')
  .description('Read your home timeline. Optional argument allowed for more or less tweets to be shown, defaulting to 10.')
  .action( tweets => {
      if (typeof tweets === 'number') {
      twitter.getTweets(tweets)
      } else {
          log(logError('You did not enter a number of tweets to read.'))
      }
  })

horus
  .command('post <text>')
  .alias('-p')
  .description('Post a tweet.')
  .action(text => {
      if(text.length > 280) {
          log(logError('Your tweet is too long. Try to keep it under 280 characters!'))
      } else {
          // Post tweet function here
      }
  })

// TODO: Command for liking / Re-Tweeting tweets

horus.parse(process.argv)

// TODO: Allow optional arg for user to set own count
// Command for tweets