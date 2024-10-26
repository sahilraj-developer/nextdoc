import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await User.findOne({ email: credentials.email });
                
                if (!user) {
                    throw new Error('No user found');
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error('Invalid password');
                }

                return { email: user.email };
            }
        })
    ],
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
        async session(session, token) {
            session.user.email = token.email;
            return session;
        }
    },
});
