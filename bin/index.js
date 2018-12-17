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
const log = console.log

if ( fs.existsSync(`${__dirname}/../.env`) === false ) {
  log(chalk.red.bold('Horus is not properly configured. Please run the \'init\' command.\n'))
}

horus
  .version('0.0.1')
  .option('init', 'Set up Twitter API keys for Horus to run.')
  .option('home', 'Read your home timeline.')
  .parse(process.argv)
  

  if(horus.init) {
    log(help.underline('In order to utilize Horus, you will need to visit https://developer.twitter.com/en/apps to generate your API Keys.'))
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
}

// TODO: Allow optional arg for user to set own count
// Command for tweets