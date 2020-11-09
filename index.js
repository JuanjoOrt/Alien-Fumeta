const Discord = require('discord.js');
require('./server/server.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

const w2gLogic = async (message, text) => {
  const response = await fetch('https://w2g.tv/rooms/create.json', {method: 'POST', 
  body: { 
    "w2g_api_key" : "af39dcef5e497058504202919cf134d081ed6cc74f7f30c1b2df38deff22f746",
    "share" : text,  // URL of the video to share - optional
}});
  const json = await response.json();
  const streamKey = json.streamkey;
  message.channel.send(` https://w2g.tv/rooms/${streamKey}`);
}


client.on('message', message => {
  console.log(message.content)
  const messageSplited = message.content.split(' ')

  if (message.content === '!ping') {
		console.log('pong')
	}

  if (messageSplited[0] === '-w') {
    	w2gLogic(message, messageSplited[1]);
	
	}
  
	if (message.content === '!alien') {
		message.channel.send('fumeta');
	}

  if (message.content === '!brakal') {
		message.channel.send('https://cdn.discordapp.com/attachments/316381660725903360/754462121667854426/brakalSupermeneo.gif');
	}

  if (message.content === '!bokeron') {
		message.channel.send('https://www.youtube.com/watch?v=Ae_2A4pCtj8');
	}

  if (message.content === '!moto') {
		message.channel.send('https://www.twitch.tv/orslok/clip/JoyousPowerfulSpindlePanicBasket?filter=clips&range=all&sort=time');
	}
  
  if (message.content === '!mujeres') {
		message.channel.send('https://www.twitch.tv/orslok/clip/KindArborealThymeKappaClaus?filter=clips&range=7d&sort=time');
	}
  
  if (message.content === '!antonio') {
		message.channel.send('Maricón');
	}
  
  if (message.content === '!poppeer') {
		message.channel.send('https://www.warcraftlogs.com/character/eu/sanguino/poppeer');
	}
  
  if (message.content === '!viernes') {
		message.channel.send('https://twitter.com/NilGarcia10/status/1271337186676350977');
	}
  
});

// login to Discord with your app's token
client.login('Nzc0MzE1ODc0MTU1NzU3NTc4.X6V_2g.JZXuCxUrCwnR4xhMJzQ2rOxVkHo');