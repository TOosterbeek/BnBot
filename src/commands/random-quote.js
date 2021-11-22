const {SlashCommandBuilder} = require('@discordjs/builders');
const createQuoteEmbed = require('../embeds/embed-quote');
const fs = require('fs');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('give-quote')
    .setDescription('Gives you a random quote from this servers quote book.');

module.exports = {
    data: data,
    async execute(interaction) {
        axios.get(process.env.API_URL + '/quotes/random').then(response => {
            if(response.status !== 200){
                interaction.reply({content: 'Could not connect to quote server'});
                return false;
            }else{
                interaction.reply({content: 'Your quote', embeds: [createQuoteEmbed(response.data)]});
            }
        });
    }
}