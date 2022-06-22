const Discord = require('discord.js')
const client = new Discord.Client();
const {readdirSync} = require('fs');
const { join } = require('path');
client.commands= new Discord.Collection();
const prefix = '+';
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js")) || readdirSync(join(__dirname, "commands/music")).filter(file => file.endsWith(".js"));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);

      const command = args.shift().toLowerCase();

      if(!client.commands.has(command)) return;


      try {
          client.commands.get(command).run(client, message, args);

      } catch (error){
          console.error(error);
      }
  }
})




const dotenv = require('dotenv');

dotenv.config();

client.login(process.env.TOKEN)