
const wa = require('@open-wa/wa-automate');
const fs = require('fs');

const availableCommands = new Set();

fs.readdir("./src/commands", (e, files) => {
  if (e){ 
    return console.error(e);
  }
  files.forEach(commandFile => {
      availableCommands.add(commandFile.replace(".js", ""));

  });
});

let prefix = ".";

wa.create({
  useChrome: true,
  headless: true,
  chromiumArgs: ["--no-sandbox", "--disable-setuid-sandbox"]
}).then(client => start(client));

let args;
let command;

function start(client) {
  client.onMessage(async message => {
    try {
        if (message.body === 'Hi') {
          await client.sendText(message.from, '👋😃 Hello!');
          await client.sendText(message.from, 'send me a media and quote with ".sticker" to create a sticker');

        }else if (message.body.startsWith(prefix)) {
          args = message.body.slice(prefix.length).trim().split(/ +/g);
          command = args.shift().toLowerCase();


        } else if (message.caption.startsWith(prefix)) {
            args = message.caption.slice(prefix.length).trim().split(/ +/g);
            command = args.shift().toLowerCase();

        }else{
          return;

        }

      if (availableCommands.has(command)) {
        require(`./commands/${command}`).run(client, message);
      }
    } catch (e) {
      console.error(e);
    }
  });
}