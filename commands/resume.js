const {GuildMember} = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resume current song!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Ти не си в моя канал!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'Ти не си в моя канал!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | Няма пусната музика!',
      });
    const success = queue.setPaused(false);
    return void interaction.followUp({
      content: success ? '▶ | Възобновена!' : '❌ | Нещо стана!',
    });
  },
};
