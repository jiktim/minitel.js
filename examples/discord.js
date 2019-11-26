const minitel = require("../minitel.js");
const fetch = require("node-fetch");

// Initialize the server
let server = new minitel();

// console.log("open");
server.on("connection", (client) => {
  let searchingMode = true;
  client.setCursorPosition(8, 15)
  client.setColor(2);
  client.print(" d i s c o r d \r\n");
  client.setColor(2);
  client.setCursorPosition(9, 9);
  client.setColor(2);
  client.print(" s a m ' s   l o u n g e ");
  client.print("\r\n");
  client.setCursorPosition(11, 10)
  client.print("tu veux envoyer quoi ?");
  client.print("\r\n\r\n");
  client.setCursorPosition(13, 1)
  client.print("[");
  client.setCursorPosition(13, 40)
  client.print("]");
  client.setCursorPosition(13, 2)
  client.on("newLine", async (input) => {
	  client.cls();
	  client.print("envoyé!");
	  client.setCursorPosition(1, 0);
	  console.log(input);
	  client.print("e");
	  let body = { username: "minitel", content: "qwerty" };
	  body["content"] = input.toLowerCase();
	  let epic = await fetch("oui !", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	  });
	  
	  let res = await epic.text();
	  console.log(res);
  }); 
  
  client.on("keyPress", async (key) => {
	client.print(key);
  });
});
