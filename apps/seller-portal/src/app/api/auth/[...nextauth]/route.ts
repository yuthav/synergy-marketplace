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
            name: 'Seller Credentials',
            credentials: {
                email: { label: 'Business Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Replace with DB lookup + KYB status check
                if (credentials?.email && credentials?.password) {
                    return { id: 'seller-1', name: 'NeuralForge Labs', email: credentials.email, role: 'seller', kybStatus: 'verified' };
                }
                return null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role ?? 'seller';
                token.portal = 'seller';
                token.kybStatus = (user as any).kybStatus ?? 'pending';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).portal = token.portal;
                (session.user as any).kybStatus = token.kybStatus;
            }
            return session;
        },
    },
    pages: { signIn: '/auth/signin', error: '/auth/error' },
    secret: process.env.NEXTAUTH_SECRET_SELLER,
});

export { handler as GET, handler as POST };
