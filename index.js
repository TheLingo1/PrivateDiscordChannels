// Require the necessary discord.js classes
const { Client, Intents, Permissions } = require('discord.js');
const { token } = require('./config.json');
const {guildId} = require('./config.json');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Event listener for when an interaction with the bot happens
client.on('interactionCreate', async interaction => {
	// if it isnt a command return
	if(!interaction.isCommand()) return;

	const {commandName} = interaction;

	// Checking value and the data type
	if (commandName === 'ping'){
		await interaction.reply('Pong!');
	} else if (commandName === 'server'){
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user'){
		await interaction.reply(`Your name and tag: ${interaction.user.tag}\nYour id ${interaction.user.id}`);
	} else if (commandName === 'private'){
		// if the threadname was provided
		if (interaction.options.getString('channelname') == undefined){
			const guild = await client.guilds.fetch(guildId);
			const everyone = guild.roles.everyone;
			const channel = await interaction.guild.channels.create(`${interaction.member.user.username}-private`, {
				permissionOverwrites: [
					{id: interaction.member.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
					{id: interaction.options.getUser('to'), allow: [Permissions.FLAGS.VIEW_CHANNEL]},
					{id: everyone.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
				],
			});
			await interaction.reply({content: `created channel: <#${channel.id}>`, ephemeral: true});
		} else{
			const guild = await client.guilds.fetch(guildId);
			const everyone = guild.roles.everyone;
			const channel = await interaction.guild.channels.create(`${interaction.options.getString('channelname')}-private`, {
				permissionOverwrites: [
					{id: interaction.member.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
					{id: interaction.options.getUser('to'), allow: [Permissions.FLAGS.VIEW_CHANNEL]},
					{id: everyone.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
				],
			});
			await interaction.reply({content: `created channel: <#${channel.id}>`, ephemeral: true});
		}
	} else if(commandName === 'delete'){
		if (interaction.options.getChannel('channel').name.includes('-private')){
			channelid = interaction.options.getChannel('channel').id;
			const guild = await client.guilds.fetch(guildId);
			const delchannel = guild.channels.cache.get(channelid);
			delchannel.delete();
			await interaction.reply({content: `Deleted private channel`, ephemeral: true});
		} else {
			await interaction.reply({content: `Not a private channel`, ephemeral: true});
		}
	}
});

// Login to Discord with your client's token
client.login(token);
