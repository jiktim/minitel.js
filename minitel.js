/*
Minitel.js
par jiktim
*/

class Minitel {
    constructor(path, isHighSpeed) {
        this.path = path; // du type "/dev/ttyUSB0"
        this.isHighSpeed = isHighSpeed; // Minitel 2+ seulement !
    }
}
