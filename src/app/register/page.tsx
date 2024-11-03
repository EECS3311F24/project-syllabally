'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful. Please log in.');
        router.push('/login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <div>
          <label className={styles.label}>Name (optional):</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
        </div>
        <div>
          <label className={styles.label}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
        </div>
        <div>
          <label className={styles.label}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}
