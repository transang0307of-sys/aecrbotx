import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI; // https://your-app.vercel.app/api/auth/callback

// Login redirect
app.get('/auth/login', (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  res.redirect(url);
});

// OAuth callback
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect('/login?error=NoCode');

  // Exchange code for token
  const data = new URLSearchParams();
  data.append('client_id', CLIENT_ID);
  data.append('client_secret', CLIENT_SECRET);
  data.append('grant_type', 'authorization_code');
  data.append('code', code);
  data.append('redirect_uri', REDIRECT_URI);
  data.append('scope', 'identify guilds');

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const tokenData = await tokenRes.json();
  if(tokenData.error) return res.redirect(`/login?error=${tokenData.error}`);

  // Lấy thông tin user
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const user = await userRes.json();

  // Trả về frontend
  const redirectUrl = `/login?token=${tokenData.access_token}`;
  res.redirect(redirectUrl);
});

export default app;
