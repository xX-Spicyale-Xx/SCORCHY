require('dotenv').config();
const { Client, IntentsBitField, userMention, User , EmbedBuilder, Guild, ButtonStyle, ActionRowBuilder, ButtonBuilder} = require('discord.js')

const client= new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const roles = [
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

]

client.on('ready', async (c) => {
    try{
        const channel = await client.channels.cache.get('1138410099430408252');
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Select your colour role below!',
            components: [row]
        });

        process.exit;
    } catch(error){
        console.log(`Yo slow down there bud - there was an error: ${error}`);
    console.log(`${c.user.tag} is online`);
}});

client.login(process.env.TOKEN);