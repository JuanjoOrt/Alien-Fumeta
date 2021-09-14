const ytdl = require("ytdl-core");
const { getInfo } = require('ytdl-getinfo')

const queue = new Map();

const play = (guild, song) => {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`👽 - **${song.title}**`);
}

module.exports = {
    execute : async (message, songTitle) => {
        const serverQueue = queue.get(message.guild.id);
        
        const voiceChannel = message.member.voice.channel;
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!voiceChannel)
            return message.channel.send("😖 No existe un canal de voz crack");
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
            return message.channel.send("👽 Igual es momento de plantearte darme permisos chulo")

        const songInfo = await getInfo(songTitle)

        const song = {
            title: songInfo.items[0].fulltitle,
            url: songInfo.items[0].webpage_url,
        };

        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            
            queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);

            try {
                const connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                console.log(err);
                serverQueue.delete(message.guild.id);
                return message.channel.send(err);
            }

        }else {
         serverQueue.songs.push(song);
         return message.channel.send(`👽 Se añade : **${song.title}** `);
        }

    },
    skip: (message) => {
        const serverQueue = queue.get(message.guild.id);
        serverQueue.connection.dispatcher.end();
    },
    stop: (message) => {
        const serverQueue = queue.get(message.guild.id);        
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }   

  };