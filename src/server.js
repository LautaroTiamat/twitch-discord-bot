require('dotenv').config()
const { start_DiscordServer } = require('./discord/bot_discord');
const { start_TwitchServer } = require('./twitch/bot_twitch');
const prefix = '*';

start_DiscordServer(prefix);
start_TwitchServer(prefix);