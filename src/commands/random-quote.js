const {SlashCommandBuilder} = require('@discordjs/builders');
const createQuoteEmbed = require('../embeds/embed-quote');
const fs = require('fs');

const data = new SlashCommandBuilder()
    .setName('give-quote')
    .setDescription('Gives you a random quote from this servers quote book.');

module.exports = {
    data: data,
    async execute(interaction) {
        const path = `../res/quotes/${interaction.guildId}_quotes.json`;
        fs.readFile(path, (err, data) => {
            if(err){
                // Just assume that when it errors out the file does not exist.
                interaction.reply('Cannot find any quotes for this server');
                return false;
            }

            const json = JSON.parse(data);
            const quoteId = Math.floor(Math.random() * json.length);

            const quote = json[quoteId];
            let embed = createQuoteEmbed(quote);

            interaction.reply({content: 'Your quote good sir', embeds: [embed]});
        });
    }
}