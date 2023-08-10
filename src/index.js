require('dotenv').config()
const { Client, GatewayIntentBits, userMention, User , EmbedBuilder, Guild, ButtonStyle, ActionRowBuilder, ButtonBuilder} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
import Game from './game'
let games = [];

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const whitCheckPattern = new RegExp('\\bwhit\\b', 'i');

const commands = [
    new SlashCommandBuilder()
        .setName('sayhello')
        .setDescription('Replies back!'),

    new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add two numbers.')
        .addNumberOption(option =>
            option.setName('first-number')
            .setRequired(true)
            .setDescription('The first number you want to add!'))
        .addNumberOption(option => 
            option.setName('second-number')
            .setRequired(true)
            .setDescription('The second number you want to add!')),

    new SlashCommandBuilder()
        .setName('aboutme')
        .setDescription('Find out more about me!'),

    new SlashCommandBuilder()
        .setName('game')
        .setDescription('Play a game! with yourself ofc you lonely fuck'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

let roles = [
    {
        id: '1138872956940984351',
        label: 'Red'
    },
    {
        id: '1138872522264281229',
        label: 'Orange'
    },
    {
        id: '1138873261350977537',
        label: 'Yellow'
    },
    {
        id: '1138876096146845717',
        label: 'Amber'
    },
    {
        id: '1138872460549312552',
        label: 'Green',
    },
    {
        id: '1138872695946223637',
        label: 'Lime',
    },
    {
        id: '1138873457833168966',
        label: 'Sky Blue',
    },
    {
        id: '1138872279212761218',
        label: 'Blue',
    },
    {
        id: '1138874500243542156',
        label: 'Royal Blue',
    },
    {
        id: '1138873058891927744',
        label: 'Light Purple',
    },
    {
        id: '1138873579417653368',
        label: 'Purple',
    },
    {
        id: '1138872605844197527',
        label: 'Pink',
    },
    {
        id: '1138874999013384242',
        label: 'Hot Pink',
    },
    {
        id: '1138872821154578565',
        label: 'Black',
    },
    {
        id: '1138876647290961951',
        label: 'Brown',
    },
    {
        id: '1138872875907027046',
        label: 'White',
    },

];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try{
        const channel = await client.channels.cache.get('1139202445281607780');
        if(!channel){
            console.log("Channel not found!")
            return;
        } 
        
        let rows = [];
        for (let i = 0; i < 4; i++){
            const row = new ActionRowBuilder();
            let currentRolesRow = [];
            while (currentRolesRow.length < 5){
                if (roles.length == 0){
                    break;
                }
                currentRolesRow.push(roles.shift(0));
            }

            currentRolesRow.forEach((role) => {
            row.addComponents(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )});
            rows.push(row);
        }

        await channel.send({
            content: '**Select your colour role below!**',
            components: [rows[0], rows[1], rows[2], rows[3]]
        });

        process.exit;
    } catch(error){
        console.log(`Yo slow down there bud - there was an error: ${error}`);
    }
});

client.on('messageCreate', msg => {
    if(msg.author.bot){
        return
    }

    if(msg.content === 'hello'){
        msg.reply('Yo Yo bro!');
    }

    if(whitCheckPattern.test(msg.content)){
        msg.reply('https://youtu.be/wmKtZRouzJM');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    else {
        const roleToAdd = interaction.guild.roles.cache.get(interaction.customId);
        const hasRole = interaction.member.roles.cache.has(interaction.customId);

        if (hasRole) {
            await interaction.member.roles.remove(roleToAdd);
            await interaction.reply({ content: `The role: ${roleToAdd.name} has been removed.`, ephemeral: true });
            return;
        }
        if (roleToAdd) {
            const member = interaction.member;
            if (member) {
                await member.roles.add(roleToAdd);
                await interaction.reply({ content: `You've been given the role: ${roleToAdd.name}`, ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'Role not found.', ephemeral: true });
        }
    }
})

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand() && !interaction.isButton()) return;

    const { commandName } = interaction;

    // Command Reponses
    if (commandName === 'sayhello'){
        await interaction.reply(`heya ${interaction.user}!`);
    }

    if (commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        await interaction.reply(`The sum is ${num1 + num2}`);
    }

    if (commandName === 'aboutme'){
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
                value: 'This is a bot made by <@342993018682605569> and <@528540788326400001> that is currently still in the works!',
                inline: true,
            });

        await interaction.reply({embeds:[embed]});
    }

    if (commandName === 'game'){
        let game = new Game(interaction.user);
        games.push(game);
        let messageContent = ''
        let gameState = game.getState();
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                switch (gameState[row][column]){
                    case 0:
                        messageContent += ':black_large_square';
                        break;
                    case 1:
                        messageContent += ':one:';
                        break;
                    case 2:
                        messageContent += ':two:';
                        break;
                    case 3:
                        messageContent += ':three:';
                        break;
                    case 4:
                        messageContent += ':four:';
                        break;
                    case 5:
                        messageContent += ':five:';
                        break;
                    case 6:
                        messageContent += ':six:';
                        break;
                    case 7:
                        messageContent += ':seven:';
                        break;
                    case 8:
                        messageContent += ':eight:';
                        break;
                }
                if (row != 2){
                    messageContent += '\n';
                }
            }
        }
        const message = await interaction.reply({ content: messageContent, fetchReply: true });
        message.react(':arrow_up');
        message.react(':arrow_down:');
        message.react(':arrow_left:');
        message.react(':arrow_right:');
    }
});

client.login(token); 