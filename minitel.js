/* Minitel.js par jiktim */

const EventEmitter = require("events");
const websocket = require("ws");
const defaultFunction = (_a, _b) => {};
const noEventHandler = { on: defaultFunction, emit: defaultFunction };
const MinitelClient = require("./client");
const MinitelInputParser = require("./inputParser");

class MinitelWSClient extends MinitelClient {
	constructor(connection) {
		super("");
		this.connection = connection;
	}
	
	_handleKeyPress(keyPress) {
		this.emit("keyPress", keyPress);
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
    this.wsServer.on("connection", (connection) => {
        let currentConnection = new MinitelWSClient(connection);
        this.emit("connection", currentConnection);
		if (!currentConnection.minitelInputBuffer) currentConnection.minitelInputBuffer = [];
        connection.on("message", (keyPress) => {
			if (!keyPress.startsWith("\u0013")) {
				currentConnection.minitelInputBuffer.push(keyPress);
			} else {
				currentConnection._handleLineStop();
			}
            currentConnection._handleKeyPress(keyPress);
        });
    });
  }
}

module.exports = Minitel;