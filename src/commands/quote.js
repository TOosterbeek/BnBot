const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');

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

//TODO: Don't be lazy and use an actual database. fuck it though. If it starts taking too long, use deferred replies on interactions.
module.exports = {
    data: data,
    async execute(interaction) {
        const guildId = interaction.guildId;

        let date = '';
        let dateArg = interaction.options.get('date');
        try{
            JSON.parse(dateArg);
            date = dateArg.value;
        }catch (e){
            date = dateArg;
        }

        const content = {
            user: interaction.options.getUser('user').username,
            content: interaction.options.get('content').value,
            date: dateArg ?? new Date().toString(),
            notifier: interaction.member.user.username,
        }
        const path = `../res/quotes/${guildId}_quotes.json`;

        // Make sure file to write quotes to exists and if not, create it and write the empty array to it.
        try{
            fs.writeFileSync(path, '[]', {flag: 'wx'});
        }catch (e){
            // ugly ugly but works works so don't care care
        }

        fs.readFile(path, (err, data) => {
            if(err){
                throw err;
            }

            let json = JSON.parse(data);
            json.push(content);

            fs.writeFile(path, JSON.stringify(json), (err) => {
                if(err) throw err;
            });

            interaction.reply({content: 'Added to the quote book!', ephemeral: true})
        })
    },
}