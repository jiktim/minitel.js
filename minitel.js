/* Minitel.js par jiktim */

const EventEmitter = require("events");
const websocket = require("ws");
const defaultFunction = (_a, _b) => {};
const noEventHandler = { on: defaultFunction, emit: defaultFunction };
let parser = noEventHandler;
let serialConnection = noEventHandler;

class MinitelWSClient extends MinitelClient {
	constructor(connection) {
		super("");
		this.connection = connection;
	}
	
	_rawSend(data) {
		// Envoi de données vers le minitel
		// if (this.hasOpened) {
		this.connection.send(data);
		// } else {
		// 	throw new Error("Tried to send data while the connection isn't open!");
		// }
	}
}

class Minitel extends EventEmitter {
  constructor(wsPort=80) {
    super();
    this.wsPort = wsPort;
    // websocket
    this.wsServer = new websocket.Server({ port: this.wsPort });
    this.wsServer.on("connection", (epic) => {
        this.emit("connection", new MinitelWSClient(epic));
    });
  }
}

module.exports = Minitel;
