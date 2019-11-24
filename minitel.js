/*
Minitel.js
par jiktim
*/

let serial = require("serialport"); 
let noEventHandler = { on: ()=>{},
                       emit: ()=>{} 
                     }
let serialConnection = noEventHandler;

class Minitel {
    constructor(path="/dev/ttyUSB0", isHighSpeed=false) {
        this.path = path; // du type "/dev/ttyUSB0"
        this.isHighSpeed = isHighSpeed; // Minitel 2+ seulement !
        this.hasOpened = false;
        serialConnection = new serial(path, {
            /*
            Selon:
            http://minitel.cquest.org/musee/minitel/documentation-utilisateurs/Mode%20d%27emploi%20Minitel%202%20philips.pdf
            */
            baudRate: isHighSpeed ? 9600 : 1200;
        });
        serialConnection.on("open", () => { this.hasOpened = true; });
    }
}
