'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert(res?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div>
          <label className={styles.label}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
        </div>
        <div>
          <label className={styles.label}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}
