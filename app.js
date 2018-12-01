// check for config files

// if no config files, run setup script

// if config file, run home page

// listen for commands


// process.stdout.write('\033c') clears console of previous commands. 
// Will use this for all functions that output to console.
const vorpal = require('vorpal')()
const chalk = require('chalk')
const fs = require('fs')
const twitter = require('./lib/twitter')

process.stdout.write('\033c') // clears console to run program

vorpal.command('init', 'Initialize Horus for Twitter API Keys')
    .action(function(args, callback) {
        this.prompt([
            {
            type:'input',
            name:'consumer_key',
            default:'',
            message: chalk.yellow('What is your Consumer Key? ')
        },
        {
            type:'input',
            name:'consumer_secret',
            default:'',
            message: chalk.yellow('What is your Consumer Secret? ')
        },
        {
            type:'input',
            name:'access_token_key',
            default:'',
            message: chalk.yellow('What is your Access Token Key? ')
        },
        {
            type:'input',
            name:'access_token_secret',
            default:'',
            message: chalk.yellow('What is your Access Token Secret? ')
        }], function(result){
            fs.writeFile('./config.json', JSON.stringify(result), err => {
                if (err) throw err
            })
        })
    })


// Allow optional arg for user to set own count?
// vorpal.command('home ', 'Read your personal timeline.')
    // .action((args, callback))
// Refresh feed

// View DMs
/* example vorpal command

    vorpal.command('foo', 'outputs "Bar"')
    .action(function(args, callback){
        this.log('bar')
        callback()
    }) */

vorpal
    .delimiter(chalk.yellow('H:'))
    .show()