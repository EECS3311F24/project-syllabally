import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebaseAdmin';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Check if user already exists
  const usersRef = firestore.collection('users');
  const querySnapshot = await usersRef.where('email', '==', email).limit(1).get();

  if (!querySnapshot.empty) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  await usersRef.add({
    email,
    password: hashedPassword,
    name: name || '',
  });

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
