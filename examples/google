/*
minitel.js
example google!
*/

const minitel = require("../minitel.js");
const fetch = require("node-fetch");

// Initialize the server
let server = new minitel();

// console.log("open");
server.on("connection", (client) => {
  let searchingMode = true;
  client.setCursorPosition(8, 15)
  client.setColor(3);
  client.print(" g");
  client.setColor(1);
  client.print(" o");
  client.setColor(2);
  client.print(" o");
  client.setColor(3);
  client.print(" g");
  client.setColor(4);
  client.print(" l");
  client.setColor(6);
  client.print(" e");
  client.print("\r\n");
  client.setCursorPosition(10, 8)
  client.print("c'est quoi votre recherche?");
  client.setCursorPosition(24, 4)
  client.print("doucement avec le clavier sinon..");
  client.print("\r\n\r\n");
  client.setCursorPosition(12, 1)
  client.print("[");
  client.setCursorPosition(12, 40)
  client.print("]");
  client.setCursorPosition(12, 2)
  client.on("newLine", (input) => {
	  searchingMode = false;
	  client.cls();
	  console.log(input);
	  client.setCursorPosition(1, 1);
	  client.setColor(3); 
	  client.print("g");
	  client.setColor(1);
	  client.print("o");
	  client.setColor(2);
	  client.print("o");
	  client.setColor(3);
	  client.print("g");
	  client.setColor(4);
	  client.print("l");
	  client.setColor(6);
	  client.print("e");
	  client.setCursorPosition(2, 1);
	  client.print("vos resultats pour ");
	  client.setCursorPosition(3, 1);
	  client.print("\""+input+"\"");
	  client.setCursorPosition(1, 1);
	  client.setColor(3); 
	  client.print("g");
  }); 
  client.on("keyPress", async (key) => {
	if(searchingMode) {
		client.print(key);
		let autoreq = await fetch("http://suggestqueries.google.com/complete/search?client=firefox&q=" + encodeURIComponent(client.minitelInputBuffer.join("")));
		let reqauto = await autoreq.json();
		client.setCursorPosition(14, 2);
		client._sendASCII(24); // clear line
		if (reqauto[1][0]) {
			client.print(client._format(reqauto[1][0]));
			client.setCursorPosition(12, 2)
			client.print(client.minitelInputBuffer.join(""));
		}
	}
  });
});
