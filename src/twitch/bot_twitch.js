const tmi = require('tmi.js');
const { playSong_fromTwitch } = require('../discord/bot_discord');
const { getGeneralMsg } = require('../generals');
const client = new tmi.client({
    identity: { username: 'lautarotiamat', password: process.env.TWITCH_PASSWORD },
    channels: ['lautarotiamat', 'lanixplanet']
});

const start_TwitchServer = prefix => {
    client.connect();

    client.on('connected', () => console.log(`✔️ Bot de Twitch iniciado correctamente.`));

    client.on('message', async (target, context, msg, self) => {
        if(self || msg.charAt(0) !== prefix) return;

        const { command, content } = getGeneralMsg(msg, prefix);

        switch(command){
            case 'dogecoin':
                client.say(target, 'Doge to the moon 🚀');
            break;
            case 'play':
                playSong_fromTwitch(content)
                    .then(res => client.say(target, res))
                    .catch(() => client.say(target, 'Ocurrió un error :('));
            break;
            default:
                client.say(target, `El comando ${command} no existe.`);
            break;
        }

    });
}

module.exports = { start_TwitchServer }