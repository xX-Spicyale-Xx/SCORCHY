require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name:'sayhello',
        description: 'Replies back!'
    },
    {
        name:'add',
        description: 'Add two numbers',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                /* remember that you can have choices here also that will appear upon doing slash commands
                 objects [
                    name: 'one',
                    value: 1
                ] */
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name:'aboutme',
        description: 'Find out more!'
    }
];


const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('Slash commands were registered!')
    } catch(error){
        console.log(`Yo slow down there bud - there was an error: ${error}`);
    }
})();