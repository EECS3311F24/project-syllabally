import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import bcrypt from 'bcryptjs';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

const firestore = getFirestore();

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }
        const { email, password } = credentials;

        // Fetch user from Firestore
        const usersRef = firestore.collection('users');
        const querySnapshot = await usersRef.where('email', '==', email).limit(1).get();

        if (querySnapshot.empty) {
          throw new Error('No user found with this email');
        }

        const doc = querySnapshot.docs[0];
        const userData = doc.data() as { email: string; password: string; name?: string };

        // Compare password
        const isValid = await bcrypt.compare(password, userData.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return user object
        return {
          id: doc.id,
          email: userData.email,
          name: userData.name || '',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user id to token
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id to session
      if (token && session.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
