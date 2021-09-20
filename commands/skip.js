const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skip a song!',
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
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | Няма пусната музика!'});
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `✅ | Пропусната **${currentTrack}**!` : '❌ | Нещо стана!',
    });
  },
};
