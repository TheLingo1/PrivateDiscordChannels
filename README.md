# PrivateDiscordChannels
A bot that makes and deletes private discord channels using the commands /private and /delete


## Requirements
You need to have Node.js along with the following npm packages "discord.js, @discordjs/builders, @discordjs/rest, discord-api-types".

Install them using this command `npm install` while in the project directory or `npm install discord.js @discordjs/builders @discordjs/rest discord-api-types` from anywhere.

## Setup 
Go to config.json and change the `token` to be your bot token, `clientId` to the be userid of your bot, and `guildId` to be the id of the server you want to use it in.

For the first time only run `node deployCommands.js` so the commands get setup.

Run the bot using `node index.js`.

## Usage

In discord to create the private channel do `/private to:@USER channelname:STRING` where `to` is a required user parameter and `channelname` is an optional string.

To delete the channel do `/delete channel:CHANNEL` where `channel` is a required channel.
