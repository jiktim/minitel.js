/*
minitel.js
example hello world!
*/

const minitel = require("minitel");
let server = new minitel("/dev/ttyUSB0", false); // Initialize the server on the USB device

server.on("ready", () => { // This is usually not needed.
  server.print("Hello, world!\nHello, Minitel!\n\nFrom: minitel.js");
});
