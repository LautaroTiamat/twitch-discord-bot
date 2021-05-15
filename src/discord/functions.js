const { YTSearcher } = require('ytsearcher');
const ytdl = require("discord-ytdl-core");
const ytSearch = new YTSearcher('AIzaSyDz3_Lm6HNsmEWtydLsWV5Wi8sJryncW-A');

const getChannels = client => {
    return {
        chatChannel: client.channels.cache.get('728005198391541840'),
        voiceChannel: client.channels.cache.get('689635456891093045')
    }
}

const youtubeSearch = async msg => ytSearch.search(msg, { type: 'video' });

const playSong = async (voiceChannel, chatChannel, ytFirstRes) => {
	voiceChannel.join()
		.then(connection => {
			chatChannel.send(`Reproduciendo: ${ytFirstRes.title}`);

			connection.play(ytdl(ytFirstRes.url, {
				filter: "audioonly",
				opusEncoded: true,
				encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
			}), { type: "opus" })
				.on("finish", () => {
					chatChannel.send('Finalizado.');
					voiceChannel.leave();
				});
		});
}

module.exports = { playSong, getChannels, youtubeSearch }