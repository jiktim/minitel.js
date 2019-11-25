const EventEmitter = require("events");

class MinitelClient extends EventEmitter {
	
    constructor(path) {
	    super();
    };
  /* _handleInput(_data) {
    this.lastInput = data;
    this.emit("lineInput", this.lastInput);
  } */

  _rawSend(data) {
    // Envoi de données vers le minitel
    // Placeholder..
  }

  _sendASCII(asciiChr) {
    this._rawSend(String.fromCharCode(asciiChr));
  }

  _format(texte) {
    let _tempTexte = texte;

    /*
    Source:
    https://github.com/cquest/pynitel/blob/master/pynitel.py#L415
    */

    // Conversion des caractères accentués (cf STUM p 103)
    _tempTexte = _tempTexte.replace("à", "\x19\x41a");
    _tempTexte = _tempTexte.replace("â", "\x19\x43a");
    _tempTexte = _tempTexte.replace("ä", "\x19\x48a");
    _tempTexte = _tempTexte.replace("è", "\x19\x41e");
    _tempTexte = _tempTexte.replace("é", "\x19\x42e");
    _tempTexte = _tempTexte.replace("ê", "\x19\x43e");
    _tempTexte = _tempTexte.replace("ë", "\x19\x48e");
    _tempTexte = _tempTexte.replace("î", "\x19\x43i");
    _tempTexte = _tempTexte.replace("ï", "\x19\x48i");
    _tempTexte = _tempTexte.replace("ô", "\x19\x43o");
    _tempTexte = _tempTexte.replace("ö", "\x19\x48o");
    _tempTexte = _tempTexte.replace("ù", "\x19\x43u");
    _tempTexte = _tempTexte.replace("û", "\x19\x43u");
    _tempTexte = _tempTexte.replace("ü", "\x19\x48u");
    _tempTexte = _tempTexte.replace("ç", "\x19\x4Bc");
    _tempTexte = _tempTexte.replace("°", "\x19\x30");
    _tempTexte = _tempTexte.replace("£", "\x19\x23");
    _tempTexte = _tempTexte.replace("Œ", "\x19\x6A").replace("œ", "\x19\x7A");
    _tempTexte = _tempTexte.replace("ß", "\x19\x7B");

    // Caractères spéciaux
    _tempTexte = _tempTexte.replace("¼", "\x19\x3C");
    _tempTexte = _tempTexte.replace("½", "\x19\x3D");
    _tempTexte = _tempTexte.replace("¾", "\x19\x3E");
    _tempTexte = _tempTexte.replace("←", "\x19\x2C");
    _tempTexte = _tempTexte.replace("↑", "\x19\x2D");
    _tempTexte = _tempTexte.replace("→", "\x19\x2E");
    _tempTexte = _tempTexte.replace("↓", "\x19\x2F");
    _tempTexte = _tempTexte.replace('̶"', "\x60");
    _tempTexte = _tempTexte.replace("|", "\x7C");

    // Caractères accentués inexistants sur Minitel
    _tempTexte = _tempTexte.replace("À", "A").replace("Â", "A").replace("Ä", "A");
    _tempTexte = _tempTexte.replace("È", "E").replace("É", "E");
    _tempTexte = _tempTexte.replace("Ê", "E").replace("Ë", "E");
    _tempTexte = _tempTexte.replace("Ï", "I").replace("Î", "I");
    _tempTexte = _tempTexte.replace("Ô", "O").replace("Ö", "O");
    _tempTexte = _tempTexte.replace("Ù", "U").replace("Û", "U").replace("Ü", "U");
    _tempTexte = _tempTexte.replace("Ç", "C");

    return _tempTexte;
  }

  print(text) {
    this._rawSend(this._format(text));
  }

  sendEsc(text) {
    this._sendASCII(27);
    this._rawSend(text);
  }

  setCursorPosition(rows = 1, columns = 1) {
    if (rows < 1 || columns < 1) {
      throw new Error("Rows/Columns can't go under 1!");
    } else if (rows == 0 && columns === 0) {
      this._sendASCII(30);
    } else {
      // Cursor changing mode :D
      this._sendASCII(31);
      // Set position
      this._sendASCII(rows + 64);
      this._sendASCII(columns + 64);

      /* Beep for happiness :)
      _sendASCII(7); */

    }
  }

  setBGColor(color) {
    this.sendEsc(String.fromCharCode(color + 80));
  }

  setColor(color) {
    this.sendEsc(String.fromCharCode(color + 64));
  }

  // BEEP
  beep() {
    this._sendASCII(7);
  }
  
}

module.exports = MinitelClient;
