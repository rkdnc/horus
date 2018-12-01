const vorpal = require('vorpal')()
const chalk = require('chalk')
const fs = require('fs')
const twitter = require('./lib/twitter')
require('dotenv').config()
const clearConsole = process.stdout.write('\033c') // clears console to run program
const help = chalk.yellow

clearConsole

vorpal.command('init', 'Initialize Horus for Twitter API Keys')
    .action(function(args, callback) {
        const self = this
        self.log(help.underline('In order to access Twitter, you will need to visit https://developer.twitter.com/en/apps to generate your API Keys.'))
        self.prompt([
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
        }], function(result){
            let keys = `CONSUMER_KEY=${result.consumer_key}\nCONSUMER_SECRET=${result.consumer_secret}\nACCESS_TOKEN_KEY=${result.access_token_key}\nACCESS_TOKEN_SECRET=${result.access_token_secret}`
            fs.writeFile('./.env', keys, err => {
                if (err) throw err
            })
            self.log(help('Setup is complete. Please restart Horus to begin.'))
        })
    })


// Allow optional arg for user to set own count?
vorpal.command('home ', 'Read your personal timeline.')
    .action(function(args, callback){
        clearConsole
        twitter.getTweets()
        vorpal.delimiter(help('H:'))
        callback()
    })

// View DMs
/* example vorpal command

    vorpal.command('foo', 'outputs "Bar"')
    .action(function(args, callback){
        this.log('bar')
        callback()
    }) */

vorpal
    .delimiter(help('H:'))
    .show()