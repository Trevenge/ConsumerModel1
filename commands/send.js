module.exports={
    name: 'send',
    description: 'send',

    async run(client, message, args) {
        // get all members in the guild
        message.guild.members.cache.forEach(member => {
        member.send(args.join([" "])).catch(e => console.error(`Couldn't DM member ${member.user.tag}`))
    })
    }
}