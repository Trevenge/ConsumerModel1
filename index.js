const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.on("message", message => {
  if (message.content === "+send"){}
      const args = message.content.slice("+send".length);
      message.guild.members.cache.forEach(member => {
          member.send(args).catch(e => console.error(`Couldn't DM member ${member.user.tag}`))})
})

const dotenv = require('dotenv');

dotenv.config();

client.login(process.env.TOKEN)