// components/TopBar.tsx

"use client";

import Link from 'next/link';
import styles from '../styles/topbar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <nav className={styles.navLinks}>
        <Link href="/credits" className={styles.navLink}>Credits</Link>
        <Link href="/notifications" className={styles.navLink}>Notifications</Link>
        <Link href="/settings" className={styles.navLink}>Settings</Link>
        <Link href="/user" className={styles.navLink}>User</Link>
      </nav>
    </div>
  );
}
