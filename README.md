Horus is an easy-to-use Twitter client in the terminal, built in Node.js with Commander. Inspired by [t by sferik](https://github.com/sferik/t)


## How to set up Horus for your account.

Once Horus is running, type `setup` to begin the setup process to enter your API keys from Twitter. You will need to sign up [here](https://developer.twitter.com/en/apps),
signing up with your Twitter account and creating a new App in order to generate your API keys. 

## Usage

Horus' functionality is based off Twitter's SMS commands found [here](https://help.twitter.com/en/using-twitter/sms-commands). Some have been omitted due to the inability to translate from SMS to terminal (such as notifications).

Any command with `<>` is a required parameter, and must be included with your command for it to execute. Commands with `[]` are optional parameters, which will have built-in defaults.

### `timeline [num]`

Displays your home timeline, showing the oldest descending. You can optionally add a number of tweets to view, with the default being 10. 

### `post <text>`

Posts a tweet (up to 280 characters). 

### `follow <username>`

Sets your account to follow an account with that username, enabling their tweets to show in your timeline.

### `unfollow <username>`

Sets your account to no longer follow that user, and you will not receive their tweets in your timeline.

### `d <username> <message>`

You will send a direct message to that user. There is no character limit for direct messages.

### `rt <username>`

This will retweet the most recent tweet by the given user.

### `like <username>`

This will 'like' the most recent tweet by the given user.

### `stats <username>`

This returns the given user's bio, the number of followers they have, and the number of people they are following.

### `search <query> [count]`

Searches public tweets for the given query. It will default to the first ten results, unless a number is specified after the query.

### Libraries Used

[Commander.js](https://github.com/tj/commander.js)

[Chalk](https://github.com/chalk/chalk)

[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)

[Twit](https://github.com/ttezel/twit)
