const Discord = require('discord.js');
const client = new Discord.Client();
const {
    prefix,
    token
} = require('./config.json');


client.once('ready', () => {
    console.log('Ready!');
});


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let mContent = message.content;


    let args = mContent.match(/[^\s"]+|"([^"]*)"/gi).map((mContent) => mContent.replace(/^"(.+(?="$))"$/, '$1'));
    let command = args.shift().slice(prefix.length).toLowerCase();


    if (command == 'poll') {
        if (!message.member.roles.cache.find(r => r.name === "Moderator")) {
            return message.channel.send(`You dont have the right permission to use this command, ${message.author}!`);
        }

        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.delete();

        if (args[0] == 'create') {

            let pollEmbed = new Discord.MessageEmbed()
                .setColor('#000001');

            if (args.length < 3) {

                pollEmbed.addFields({
                    name: args[1],
                    value: ':arrow_up: Yes \n\n :arrow_down: No'
                });

                message.channel.send(pollEmbed).then(embed => {
                    embed.react("⬆");
                    embed.react("⬇");
                });
            }
            //
            else if (args.length >= 3) {

                const numEmote = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

                let question = args[1];
                args.splice(0, 2)


                if (args.length > 10) {
                    return message.channel.send(`You can only have a maximal of 10 options`);
                }

                let option = '';


                for (let i in args) {
                    option += numEmote[i] + " " + args[i] + "\n\n";
                }

                pollEmbed.addFields({
                    name: question,
                    value: option
                });

                message.channel.send(pollEmbed).then(embed => {
                    for (let i in args) {
                        embed.react(numEmote[i]);
                    }
                });
            }
        } // END OF POLL CREATE


    } // END OF POLL COMMAND
});


client.login(token);