import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Replace with real DB lookup
                if (credentials?.email && credentials?.password) {
                    return { id: 'buyer-1', name: 'Buyer', email: credentials.email, role: 'buyer' };
                }
                return null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) { token.role = (user as any).role ?? 'buyer'; token.portal = 'marketplace'; }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).portal = token.portal;
            }
            return session;
        },
    },
    pages: { signIn: '/auth/signin', error: '/auth/error' },
    secret: process.env.NEXTAUTH_SECRET_MARKETPLACE,
});

export { handler as GET, handler as POST };
