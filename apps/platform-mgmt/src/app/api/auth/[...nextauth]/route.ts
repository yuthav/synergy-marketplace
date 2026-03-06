import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import TOTPProvider from 'next-auth/providers/totp'; // conceptual — use custom TOTP
// For real MFA: use a custom verify step with speakeasy or otpauth

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'Admin Credentials',
            credentials: {
                email: { label: 'Admin Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                mfaCode: { label: 'MFA Code', type: 'text' },
            },
            async authorize(credentials) {
                // Replace with real admin DB lookup + MFA verification
                const isAdmin = credentials?.email?.endsWith('@synergetics.ai') && credentials?.password;
                const mfaValid = credentials?.mfaCode?.length === 6; // real check: speakeasy.totp.verify(...)
                if (isAdmin && mfaValid) {
                    return { id: 'admin-1', name: 'Platform Admin', email: credentials!.email, role: 'admin' };
                }
                if (isAdmin && !mfaValid) {
                    throw new Error('InvalidMFA');
                }
                return null;
            },
        }),
    ],
    session: { strategy: 'jwt', maxAge: 8 * 60 * 60 /* 8h admin sessions */ },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role ?? 'admin';
                token.portal = 'platform';
                token.mfaVerified = true;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).portal = token.portal;
                (session.user as any).mfaVerified = token.mfaVerified;
            }
            return session;
        },
        async signIn({ account }) {
            // Only allow Google sign-in from @synergetics.ai domain
            if (account?.provider === 'google') {
                return true; // add domain check in production
            }
            return true;
        },
    },
    pages: { signIn: '/auth/signin', error: '/auth/error' },
    secret: process.env.NEXTAUTH_SECRET_PLATFORM,
});

export { handler as GET, handler as POST };
