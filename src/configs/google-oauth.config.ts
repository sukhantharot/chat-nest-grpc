import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => ({
  client: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  callbackURL: `http://localhost:4135/auth/google/callback`,
}));
