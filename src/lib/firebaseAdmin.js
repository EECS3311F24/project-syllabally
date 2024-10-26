import admin from 'firebase-admin';

if (!admin.apps.length) {
  // Initialize the Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines with actual newlines in the private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const firestore = admin.firestore();

export { admin, firestore};
