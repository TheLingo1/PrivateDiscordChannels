// getting the required packages
const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {token} = require('./config.json');
const {clientId} = require('./config.json');
const {guildId} = require('./config.json');

// Calls every element in the array with map function and changes it to JSON
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with the server name!'),
	new SlashCommandBuilder().setName('user').setDescription('Resplies with user info!'),
	new SlashCommandBuilder()
		.setName('private')
		.setDescription('Make a temporary private channel with someone')
		.addUserOption(option =>
			option.setName('to')
				.setDescription('The user to make the private thread with')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('channelname')
				.setDescription('The thread name')
				.setRequired(false)),
	new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete the specified temporary channel')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel to delete')
				.setRequired(true)),
].map(command => command.toJSON());

// REST is used to access the discord api
const rest = new REST({ version: '9' }).setToken(token);

// Put request that registers our commands to the specified guild in config.json
rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
