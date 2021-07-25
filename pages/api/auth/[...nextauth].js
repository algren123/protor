import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
          }),
    ],

    database: process.env.DATABASE_URL,

    callbacks: {
        session: async (session, user) => {
          session.id = user.id;
          return Promise.resolve(session);
        }
    }
})