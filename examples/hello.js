/*
minitel.js
example hello world!
*/

const minitel = require("minitel");
// Initialize the server on the USB device
let server = new minitel("/dev/ttyUSB0", false);

// This is usually not needed.
server.on("ready", () => {
  server.print("Hello, world!\nHello, Minitel!\n\nFrom: jiktim's minitel.js");
});
