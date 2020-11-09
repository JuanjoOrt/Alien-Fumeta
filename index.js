const Discord = require('discord.js');
require('./server/server.js');
const singleQuerys = require('./constants/singleQuerys');
const client = new Discord.Client();
const fetch = require('node-fetch');

const w2gLogic = async (message, text) => {
  const response = await fetch('https://w2g.tv/rooms/create.json', {method: 'POST', 
  body: { 
    "w2g_api_key" : "spucwwgugq7aqjjy4nyja1w37epmnzsp69qwvxxjwbeq3m6ep2q17ym3tbz527jr",
    "share" : text,  // URL of the video to share - optional
}});
  const json = await response.json();
  const streamKey = json.streamkey;
  message.channel.send(` https://w2g.tv/rooms/${streamKey}`);
}


client.on('message', message => {
  console.log(message.content)
  const messageSplited = message.content.split(' ')

  singleQuerys.singleQuery().map(query => {
    if (message.content === query.command) {
		message.channel.send(query.response);
	}
  })

  if (message.content === '!ping') {
		console.log('pong')
	}

  if (messageSplited[0] === '-w') {
    	w2gLogic(message, messageSplited[1]);
	
	}
  
	if (message.content === '!alien') {
		message.channel.send('fumeta');
	}

  
});

// login to Discord with your app's token
client.login('Nzc0MzE1ODc0MTU1NzU3NTc4.X6V_2g.w6EPLuU8Ju2-44ObRorsYqU9w0I');