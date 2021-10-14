const dotenv = require('dotenv').config();

const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('ready');
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an issue while executing this command', ephemeral: true});
    }
})

client.login(process.env.TOKEN);