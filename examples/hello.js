/*
minitel.js
example hello world!
*/

const minitel = require("./minitel.js");
// Initialize the server
let server = new minitel();

console.log("open");
server.on("connection", (client) => {
  client.print("Hello, world!");
  client.beep();
});
