const {MessageEmbed} = require('discord.js');

/**
 * Creates embed for a certain quote
 * @param quote Quote to create embed for in JSON format
 */
const embed = (quote) => {
    return new MessageEmbed()
        .setTitle(`Quote from ${quote.user}`)
        .addField("\u200b", `${quote.content} - ${quote.date}`, true)
        .setFooter(`Quoted by ${quote.notifier}`);
}

module.exports = embed;