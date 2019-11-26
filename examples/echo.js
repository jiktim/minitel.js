/*
minitel.js
example echo!
*/

const minitel = require("../minitel.js");
// Initialize the server
let server = new minitel();

// console.log("open");
server.on("connection", (client) => {
  client.on("keyPress", (key) => {
	client.print(key);
  });
});