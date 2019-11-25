/*
minitel.js
example hello world!
*/

const minitel = require("../minitel.js");
// Initialize the server
let server = new minitel();

// console.log("open");
server.on("connection", (client) => {
  console.log("connection");
  console.log(client);
  client.print("azerty\nqsdfgh\nwxcvbn");
  client.beep();
});
