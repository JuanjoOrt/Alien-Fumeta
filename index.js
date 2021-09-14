const Discord = require('discord.js');
require('./server/server.js');
const singleQuerys = require('./constants/singleQuerys');
const watchTogether = require('./watchTogether/watchTogether');
const musicBot = require('./music/musicbot')

const client = new Discord.Client();


client.on('message', message => {
  const messageSplited = message.content.split(' ')

  singleQuerys.singleQuery().map(query => {if (message.content === query.command) message.channel.send(query.response)})

  if (message.content === '!ping') {
		console.log('pong')
	}

  if (messageSplited[0] === '-w') {
    watchTogether.w2gLogic(message, messageSplited[1]);
    return;
	}


  if (messageSplited[0] === '-p') {
    const songTitle = message.content.split('-p')[1]
    musicBot.execute(message, songTitle);
    return;
	}

  if (messageSplited[0] === '-stop') {
    musicBot.stop(message);
    return;
	}

  if (messageSplited[0] === '-n') {
    musicBot.skip(message);
    return;
	}
  
});

// login to Discord with your app's token
client.login('Nzc0MzE1ODc0MTU1NzU3NTc4.X6V_2g.w6EPLuU8Ju2-44ObRorsYqU9w0I');