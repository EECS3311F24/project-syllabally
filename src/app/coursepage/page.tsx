import TopBar from './components/topbar';
import Sidebar from './components/sidebar';
import Infobox from './components/infobox';
import Uploadbox from './components/uploadbox';
import Forumbox from './components/forumbox';
import styles from './styles/coursepage.module.css';

const Homepage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <TopBar />
      
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.content}>
          <Infobox className={styles.courseinfo} header="Course: <Insert Course Name Here>" body="Description about this course..." />
          <Infobox className={styles.courserate} header="Rate This Course" body="Course Rate:..." dropdownOptions={['Excellent', 'Good', 'Average', 'Poor']} />
          <Infobox className={styles.profrate} header="Rate This Professor" body="Professor Rate:..." dropdownOptions={['Excellent', 'Good', 'Average', 'Poor']} />
          <Forumbox className={styles.forum} header="Forum" body="Coming Soon" placeholder="Type your conversation here..." button="Send" />
          <Uploadbox className={styles.uploadsyllabus} header="Uploaded Syllabuses" body="Coming Soon" button="Upload" />
        </div>
      </div>
    </div>
  );
};
export default Homepage;
