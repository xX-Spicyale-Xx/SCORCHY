require('dotenv').config()
const { mongoose, Schema, model} = require('mongoose')
const { Client, GatewayIntentBits, Partials, userMention, User , EmbedBuilder, Guild, ButtonStyle, ActionRowBuilder, ButtonBuilder, ActivityType, ApplicationCommandOptionType, ApplicationCommandType} = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

class NumberPuzzle {
    constructor(player) {
        this.player = player;
        this.state = [[1, 2, 3],
                      [4, 5, 6],
                      [7, 8, 0]];
        this.start_date = new Date();
        this.message_id = ''

        for (let i = 0; i < 1000; i++){
            let direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)]
            this.move(direction);
        }
    }

    move(direction) {
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                if (this.state[row][column] == 0){
                    switch (direction) {
                        case 'up':
                            if (row == 2){
                                return;
                            }
                            this.state[row][column] = this.state[row + 1][column];
                            this.state[row + 1][column] = 0;
                            return;

                        case 'down':
                            if (row == 0){
                                return;
                            }
                            this.state[row][column] = this.state[row - 1][column];
                            this.state[row - 1][column] = 0;
                            return;

                        case 'left':
                            if (column == 2){
                                return;
                            }
                            this.state[row][column] = this.state[row][column + 1];
                            this.state[row][column + 1] = 0;
                            return;
                            
                        case 'right':
                            if (column == 0){
                                return;
                            }
                            this.state[row][column] = this.state[row][column - 1];
                            this.state[row][column - 1] = 0;
                            return;
                    }
                }
            }
        }
    }

    gameFinished(){
        let counter = 1;
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                let currentNum = this.state[row][column];
                if (currentNum != counter){
                    return false;
                }

                if (currentNum == 8){
                    return true;
                }
                counter++;
            }
        }
    }
}

let games = [];

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const mongoID = process.env.MONGODB_URI;

const whitCheckPattern = new RegExp('\\bwhit\\b', 'i');
const nWordCheckPattern = new RegExp('\\b(nigga|nigger)\\b', 'i');

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

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Bot Latency'),

    /* how are you supposed to set types in this format????
    
    new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Talktalk go byebye')
        .addStringOption(option =>
            option.setName('user-target')
            .setRequired(true)
            .setDescription('Select a user to time out'))
        .addNumberOption(option => 
            option.setName('duration')
            .setRequired(true)
            .setDescription('How long do you want the timeout to last')) */

        

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        await mongoose.connect(mongoID);
        console.log('Connected to DB!')
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

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
                                      GatewayIntentBits.GuildMembers, 
                                      GatewayIntentBits.GuildMessages, 
                                      GatewayIntentBits.MessageContent,
                                      GatewayIntentBits.GuildMessageReactions],
                            partials: [Partials.message,
                                       Partials.channel,
                                       Partials.reaction]});

module.exports = (level) => 100 * level || 1;

/**
 * @param {Client} client 
 * @param {message} message 
 */

const levelSchema = new Schema({
    userId: {
        type: String,
        required: true, 
    },
    guildId: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },
});
module.exports = model('Level', levelSchema)

module.exports = async (client, message) => {
    
    if (!message.inGuild() || message.author.bot) return;
    
    let char = msg.content.length
    xp = Math.ceil(Math.log(5(char)+10)*6)

    const query = {
        userId: msg.author.id,
        guildId: msg.guild.id,
    };

    try{
        const Level = await level.findOne(query);

        if(Level){
            level.xp =+ xpToGive;

            if (level.xp > calculateLevelXp(level.level));
        }
    }catch(error) {
        console.log(`Yo slow down there bud - there was an error: ${error}`);
    }

}



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

    client.user.setActivity({
        name: 'this server...',
        type: ActivityType.Watching
    })

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

        /*await channel.send({
            content: '**Select your colour role below!**',
            components: [rows[0], rows[1], rows[2], rows[3]]
        }); */

        process.exit;
    } catch(error){
        console.log(`Yo slow down there bud - there was an error: ${error}`);
    }
});

client.on('messageCreate', msg => {
    if(msg.author.bot){
        return;
    }

    if (Math.floor(Math.random() * 500) === 0){
        if (Math.floor(Math.random() * 2) === 0){
            msg.reply('Dude my balls are itching');
        }
        else{
            msg.reply('Guys, can you help me scartch my balls');
        }
    }

    if(msg.content === 'hello'){
        msg.reply('Yo Yo bro!');
    }

    if(whitCheckPattern.test(msg.content)){
        msg.reply('https://youtu.be/wmKtZRouzJM');
    }

    if(nWordCheckPattern.test(msg.content)){
        msg.reply('https://tenor.com/view/anime-toraburu-popsicle-momo-belia-deviluke-gif-14049232');
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
    if(!interaction.isChatInputCommand()){

        return;
    }

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

    if (commandName === 'ping') {
        console.log(Date.now())
        const ping = Math.round(client.ws.ping);

        await interaction.reply(`Pong! Bot's ping is ${ping}ms.`);
    }

    if (commandName === 'game'){
        games.forEach((activeGame) =>{
            if (activeGame.player === interaction.user){
                games.splice(games.indexOf(activeGame), 1);
            }
        });

        const game = new NumberPuzzle(interaction.user);
        games.push(game);
        let messageContent = `${interaction.user}'s game:\n`
        let gameState = game.state;
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                switch (gameState[row][column]){
                    case 0:
                        messageContent += ':white_large_square:';
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
            }
            messageContent += '\n';
        }
        const message = await interaction.reply({ content: messageContent, fetchReply: true });
        message.react('⬆️');
        message.react('⬇️');
        message.react('⬅️');
        message.react('➡️');
        game.message_id = message.id;
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return; 

    direction_emojis = ['⬆️', '⬇️', '⬅️', '➡️']
    games.forEach((game) =>{
        direction_emojis.forEach(async (emoji) =>{
            if (reaction.emoji.name === emoji && user === game.player){
                switch(emoji){
                    case '⬆️':
                        game.move('up');
                        break;
                    case '⬇️':
                        game.move('down');
                        break;
                    case '⬅️':
                        game.move('left');
                        break;
                    case '➡️':
                        game.move('right');
                        break;
                }

                if (game.gameFinished()){
                    let endDate = new Date();
                    let ElaspedTime = endDate - game.start_date;

                    let seconds = ElaspedTime / 1000;

                    games.splice(games.indexOf(game), 1);
                    delete game;
                    const message = await reaction.message.channel.messages.fetch(game.message_id);
                    message.edit(`GG! ${user} , wasting ${seconds} seconds of your life on this dumb game, now think about the purpose of your meaningless life!! :smile:`);
                    message.reactions.removeAll();
                    return;
                }

                let messageContent = `${user}'s game:\n`
                let gameState = game.state;
                for (let row = 0; row < 3; row++){
                    for (let column = 0; column < 3; column++){
                        switch (gameState[row][column]){
                            case 0:
                                messageContent += ':white_large_square:';
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
                    }
                    messageContent += '\n';
                }
                const message = await reaction.message.channel.messages.fetch(game.message_id);
                message.edit({ content: messageContent, fetchReply: true });
                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                try {
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                    }
                } catch (error) {
                    console.error('Failed to remove reactions.');
                }
                return;
            }
        });
    });
});

client.login(token); 