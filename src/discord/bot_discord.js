const Discord = require('discord.js');
const { getChannels, youtubeSearch, playSong } = require('./functions');
const { getGeneralMsg } = require('../generals');
const client = new Discord.Client();

const playSong_fromTwitch = async msg => {
    const { chatChannel, voiceChannel } = getChannels(client);

	return await youtubeSearch(msg).then(async ytRes => {
		return await playSong(voiceChannel, chatChannel, ytRes.first)
			.then(() => `Reproduciendo: ${ytRes.first.title}`);
	});
}

const start_DiscordServer = prefix => {
    client.on('ready', () => console.log(`✔️ Iniciado como ${client.user.tag}!`));
    
    client.on('message', message => {
        if(message.author.bot || !message.guild || message.content.charAt(0) !== prefix) return;

        const { command, content } = getGeneralMsg(message.content, prefix);

        switch(command){
            case 'dogecoin':
                message.reply('#DogeToTheMoon 🚀');
            break;
            case 'play':
                youtubeSearch(content).then(ytRes => playSong(message.member.voice.channel, message.channel, ytRes.first));
            break;
            default:
                message.reply(`el comando '${command}' no existe.`);
            break;
        }
    });

    client.login(process.env.DISCORD_TOKEN);
}

module.exports = { start_DiscordServer, playSong_fromTwitch }