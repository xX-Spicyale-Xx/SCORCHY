require('dotenv').config()
const { Client, GatewayIntentBits, userMention, User , EmbedBuilder, Guild, ButtonStyle, ActionRowBuilder, ButtonBuilder} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

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
        .setName('whoasked')
        .setDescription('You will finally figure who asked'),
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
            console.log("line 1 works")
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
    if(!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

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
                value: 'This is a bot made by <@342993018682605569> and <@528540788326400001>  currently still in the works!',
                inline: true,
            });

        await interaction.reply({embeds:[embed]});
    }

    if (commandName === 'whoasked'){
        await interaction.reply(`I’m a gay teenage boy that was groomed into believing I was a trans woman online. 
        When I was around 13-14, I had a group of friends online on discord, usually ranging from 18-24, most of them 
        being on the TQ+ side of the lgbtq+. At the time, I recently found out I was gay (bisexual technically because 
        I thought I liked women when really I just like feminine things), which, at 13 thats insanely early to find 
        out I was gay. I had a small interest in crossdressing and fashion, I liked femboys and seeing cute outfits, 
        like many gay men. my online “friends” made me believe that this interest made me a transwoman, and encouraged
        me to start using She/Her or They/Them pronouns. Me being a VERY young teenager, believed this, and came out 
        as trans online. They encouraged me to shave my legs and post images of me in thigh highs and skirts in lewd 
        poses and videos, KNOWING I WAS 13 AT THE TIME.`);
    }
});

client.login(token); 