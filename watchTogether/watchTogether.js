const fetch = require('node-fetch');

module.exports = {
    w2gLogic : async (message, text) => {
        const response = await fetch('https://w2g.tv/rooms/create.json', {method: 'POST', 
        body: { 
          "w2g_api_key" : "spucwwgugq7aqjjy4nyja1w37epmnzsp69qwvxxjwbeq3m6ep2q17ym3tbz527jr",
          "share" : text,  // URL of the video to share - optional
      }});
        const json = await response.json();
        const streamKey = json.streamkey;
        message.channel.send(` https://w2g.tv/rooms/${streamKey}`);
      }

  };