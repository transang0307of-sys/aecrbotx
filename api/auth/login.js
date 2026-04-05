export default async function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    'https://aecrbotxnet.netlify.app/api/auth/callback'
  );
  const scope = 'identify guilds';
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

  res.redirect(discordUrl);
}
