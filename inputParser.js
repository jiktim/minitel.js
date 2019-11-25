const { Transform } = require("stream");
let isCursorEnabled = false;

class MinitelInputParser extends Transform {
  // TODO: le faire marcher
  constructor(options = {}) {
    super(options);
    this.buffer = Buffer.alloc(0);
    this.i = 0;
  }

  _transform(chunk, _encoding, cb) {
    if (isCursorEnabled) {
      // TODO: ajouter les caveats du
      // https://github.com/cquest/pynitel/blob/master/pynitel.py#L196
      if (chunk.toString().split("")[chunk.toString().length - 1].includes("\n")) {
	      // pas de bruit
        let temp = [...this.buffer];
	      [0,1].map(a=>{temp.pop()});
	      this.buffer = Buffer.from(temp);
	      temp = null;
        this.push(this.buffer);
        this.buffer = Buffer.alloc(0);
        this.i = 0;
      }

      if (chunk.toString() >= " ") { // si c'est une lettre
        this.buffer = Buffer.concat([this.buffer, chunk]);
      }

      this.i++;
    }
    cb();
  }
}

module.exports = MinitelInputParser;
