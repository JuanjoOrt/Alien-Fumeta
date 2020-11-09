
//server
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT, () => console.log("Your app is listening on port " + process.env.PORT))


