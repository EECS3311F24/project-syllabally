// components/Sidebar.tsx

"use client";

import Link from 'next/link';
import styles from '../styles/sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link href="/saved" className={styles.sidebarLink}>Saved</Link>
      <Link href="/myUploads" className={styles.sidebarLink}>My Uploads</Link>
      <Link href="/forums" className={styles.sidebarLink}>Forums</Link>
    </div>
  );
}
