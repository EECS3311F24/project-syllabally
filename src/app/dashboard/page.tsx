// pages/index.tsx

import TopBar from './components/topbar';
import SearchClient from '../search/SearchClient';
import Sidebar from './components/sidebar';
import styles from './styles/homepage.module.css';
import {Course} from '@/types';
import fs from 'fs';
import path from 'path';

export default function HomePage() {
  const coursesData = getCoursesData();
  return (
    <div className={styles.layout}>
      <TopBar />
      
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.content}>
        <h1>Welcome to Syllabally</h1>
          <SearchClient courses={coursesData} />
          {/* Main page content goes here */}
        </div>
      </div>
    </div>
  );
}

function getCoursesData(): Course[] {
  const filePath = path.join(process.cwd(), 'public', 'courses.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const courses: Course[] = JSON.parse(jsonData);
  return courses;
}
