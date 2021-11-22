const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Add a quote to the quotebook!')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user that said the quote')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('content')
            .setDescription('The content of the quote')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('date')
            .setDescription('The date at which the quote occurred, when omitted the current time will be used')
            .setRequired(false)
    );

const execute = async (interaction) => {
    axios.put(process.env.API_URL + '/quotes', {
        user: interaction.options.getUser('user').username,
        content: interaction.options.get('content').value,
        date: interaction.options.get('date') !== null ? new Date().toString() : interaction.options.get('date'),
        notifier: interaction.member.user.username,
        guildId: interaction.guildId,
    }).then(res => {
        if (res.status === 200) {
            interaction.reply({content: 'Added to the quote book!', ephemeral: true});
        }
    }).catch(err => {
        console.error(err);
    });
}

module.exports = {
    data: data,
    execute,
}