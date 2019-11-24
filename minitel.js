/*
Minitel.js
par jiktim
*/

let serial = require("serialport"); 
let serialConnection = null;

class Minitel {
    constructor(path="/dev/ttyUSB0", isHighSpeed=false) {
        this.path = path; // du type "/dev/ttyUSB0"
        this.isHighSpeed = isHighSpeed; // Minitel 2+ seulement !
        serialConnection = new serial(path, {
            baudRate: isHighSpeed ? 9600 : 1200;
        });
    }
}
