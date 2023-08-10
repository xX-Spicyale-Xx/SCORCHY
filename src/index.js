const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const token = 'MTEzOTExNzU0NDA2Njc5MzUyMg.G_WbXq.p5RITuljrqEbYi834Ly7-uViRVVeDaMIzOGsAM';
const clientId = '1139117544066793522';
const guildId = '1139117312620896296';

const commands = [
    new SlashCommandBuilder()
        .setName('sayhello')
        .setDescription('Replies back!'),

    new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add two numbers.')
        .addNumberOption(option => {
            option.setName('first-number')
            .setRequired(true)
            .setDescription('The first number you want to add!')
        })
        .addNumberOption(option => {
            option.setName('second-number')
            .setRequired(true)
            .setDescription('The second number you want to add!')
        }),

    new SlashCommandBuilder()
        .setName('aboutme')
        .setDescription('Find out more about me!'),
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

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

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
                value: 'This is a bot made by <@342993018682605569> currently still in the works!',
                inline: true,
            });

        await interaction.reply({embeds:[embed]});
    }
});

client.login(token);