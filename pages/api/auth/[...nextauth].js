import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
        // Providers.Email({
        //     server: {
        //         host: '',
        //         port: '',
        //         auth: {
        //             user: '',
        //             pass: ''
        //         }
        //     },
        //     form: '',
        // })
    ],

    database: process.env.DATABASE_URL,

    callbacks: {
        session: async (session, user) => {
          session.id = user.id;
          return Promise.resolve(session);
        }
    }
})