/*
Minitel.js
par jiktim
*/

const EventEmitter = require("events");
const serial = require("serialport");
const { Transform } = require("stream")
const defaultFunction = (a, b) => {};
const noEventHandler =  { on: defaultFunction, emit: defaultFunction };

let parser = noEventHandler;
let serialConnection = noEventHandler;

class MinitelInputParser extends Transform {
	// TODO: le faire marcher
	constructor (options = {}) {
    		super(options)
		this.buffer = Buffer.alloc(0)
	}
	
	_transform(chunk, encoding, cb) {
		// TODO: faire le handler pour le transform
	}
}

class Minitel extends EventEmitter {
		constructor(path="/dev/ttyUSB0", isHighSpeed=false) {
				this.isCursorEnabled = false;
				this.path = path; // du type "/dev/ttyUSB0"
				this.isHighSpeed = isHighSpeed; // Minitel 2+ seulement !
				this.hasOpened = false;
				this.lastInput = "";
				this._handleInput = defaultFunction;
				this.colors = {
					black: 0,
					red: 1,
					green: 2,
					yellow: 3,
					blue: 4,
					magenta: 5,
					cyan: 6,
					white: 7
				};

				serialConnection = new serial(path, {
					/*
					Selon:
					http://minitel.cquest.org/musee/minitel/documentation-utilisateurs/Mode%20d%27emploi%20Minitel%202%20philips.pdf
					*/
					baudRate: (isHighSpeed ? 9600 : 1200),
				});
				
				serialConnection.on("open", () => { 
					this.hasOpened = true;
					this.emit("ready", true);
				});
			
				/* parser = port.pipe(new MinitelInputParser({ delimiter: "\n" }));
				parser.on("data", this._handleInput) */
		}
    		
		_handleInput(data) {
			/* if (isCursorEnabled) {
				this.lastInput = data;
				this.emit("lineInput", this.lastInput); 
			} */
		}

		_rawSend(data) {
			// Envoi de données vers le minitel
			if (this.hasOpened) {
				serialConnection.write(data);
			} else {
				throw new Error("Tried to send data while connection hasn't opened yet!");
			}
		}
		
		_sendASCII(asciiChr) {
			_rawSend(String.fromCharCode(asciiChr));
		}
		
		_format(texte) {
			let _tempTexte = texte;
			/* 
			Source:
			https://github.com/cquest/pynitel/blob/master/pynitel.py#L415 
			*/
			
			// Conversion des caractères accentués (cf STUM p 103)
			_tempTexte = _tempTexte.replace("à", "\x19\x41a")
			_tempTexte = _tempTexte.replace("â", "\x19\x43a")
			_tempTexte = _tempTexte.replace("ä", "\x19\x48a")
			_tempTexte = _tempTexte.replace("è", "\x19\x41e")
			_tempTexte = _tempTexte.replace("é", "\x19\x42e")
			_tempTexte = _tempTexte.replace("ê", "\x19\x43e")
			_tempTexte = _tempTexte.replace("ë", "\x19\x48e")
			_tempTexte = _tempTexte.replace("î", "\x19\x43i")
			_tempTexte = _tempTexte.replace("ï", "\x19\x48i")
			_tempTexte = _tempTexte.replace("ô", "\x19\x43o")
			_tempTexte = _tempTexte.replace("ö", "\x19\x48o")
			_tempTexte = _tempTexte.replace("ù", "\x19\x43u")
			_tempTexte = _tempTexte.replace("û", "\x19\x43u")
			_tempTexte = _tempTexte.replace("ü", "\x19\x48u")
			_tempTexte = _tempTexte.replace("ç", "\x19\x4Bc")
			_tempTexte = _tempTexte.replace("°", "\x19\x30")
			_tempTexte = _tempTexte.replace("£", "\x19\x23")
			_tempTexte = _tempTexte.replace("Œ", "\x19\x6A").replace("œ", "\x19\x7A")
			_tempTexte = _tempTexte.replace("ß", "\x19\x7B")
			
			// Caractères spéciaux
			_tempTexte = _tempTexte.replace("¼", "\x19\x3C")
			_tempTexte = _tempTexte.replace("½", "\x19\x3D")
			_tempTexte = _tempTexte.replace("¾", "\x19\x3E")
			_tempTexte = _tempTexte.replace("←", "\x19\x2C")
			_tempTexte = _tempTexte.replace("↑", "\x19\x2D")
			_tempTexte = _tempTexte.replace("→", "\x19\x2E")
			_tempTexte = _tempTexte.replace("↓", "\x19\x2F")
			_tempTexte = _tempTexte.replace('̶"', "\x60")
			_tempTexte = _tempTexte.replace("|", "\x7C")
			
			// Caractères accentués inexistants sur Minitel
			_tempTexte = _tempTexte.replace("À", "A").replace("Â", "A").replace("Ä", "A")
			_tempTexte = _tempTexte.replace("È", "E").replace("É", "E")
			_tempTexte = _tempTexte.replace("Ê", "E").replace("Ë", "E")
			_tempTexte = _tempTexte.replace("Ï", "I").replace("Î", "I")
			_tempTexte = _tempTexte.replace("Ô", "O").replace("Ö", "O")
			_tempTexte = _tempTexte.replace("Ù", "U").replace("Û", "U").replace("Ü", "U")
			_tempTexte = _tempTexte.replace("Ç", "C")
			
			return _tempTexte;
		}
	
		print(text) {
			_rawSend(_format(text));
		}
		
		sendEsc(text) {
        		_sendASCII(27);
        		_rawSend(text);
		}
	
		setBGColor(color) {
        		sendEsc(String.fromCharCode(color + 80))
		}
	
		setColor(color) {
        		sendEsc(String.fromCharCode(color + 64))
		}
		
		beep() { // BEEP
			_sendASCII(7);
		}
}
