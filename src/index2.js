require('dotenv').config();
const { Client, IntentsBitField, userMention, User , EmbedBuilder, Guild} = require('discord.js')

const client= new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
    if(message.author.bot){
        return
    }

    if(message.content === 'hello'){
        message.reply('Yo Yo bro!');
    }

    if(message.content.includes(' whit ') || message.content === 'whit'){
        message.reply('https://youtu.be/wmKtZRouzJM');
    }
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'sayhello'){
        interaction.reply(`heya ${interaction.user}!`)
    }

    if(interaction.commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`The sum is ${num1 + num2}`)
    }

    if(interaction.commandName === 'aboutme'){

       // console.log(interaction);

        const embed = new EmbedBuilder()
            .setTitle("Welcome!")
            .setThumbnail()
            .setDescription("If you're reading this I hope you have a good day")
            .setColor(0xFF7276)
            .setAuthor({ 
                name: client.user.displayName, 
                iconURL: 'https://woodpunchsgraphics.com/cdn/shop/products/Discord_pfp_template_red.jpg',
                url: 'https://discord.gg/RnAF87Y9jf',
             })
            .addFields({
                name: 'What is this bot?',
                value: 'This is a bot made by <@342993018682605569> currently still in the works!',
                inline: true,
            });

        interaction.reply({embeds:[embed]});
    }

    if (interaction.commandName === 'notaboutme'){
        interaction.reply(`I’m a gay teenage boy that was groomed into believing I was a trans woman online.`);
    }
})

client.login(process.env.TOKEN);