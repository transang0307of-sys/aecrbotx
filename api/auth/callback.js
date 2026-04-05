import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = 'https://your-vercel-domain.vercel.app/api/auth/callback';

  if (!code) return res.status(400).send('No code provided');

  const data = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    scope: 'identify guilds',
  });

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const tokenJson = await tokenRes.json();
  if (tokenJson.error) return res.redirect(`/login?error=${tokenJson.error}`);

  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  const user = await userRes.json();

  // Trả token cho frontend
  res.redirect(`/login?token=${tokenJson.access_token}`);
}
