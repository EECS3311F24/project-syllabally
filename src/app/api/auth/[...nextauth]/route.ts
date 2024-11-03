import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust the import path as needed

// Specify the runtime environment
export const runtime = 'nodejs';

// Export the NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
