// pages/index.tsx

import TopBar from './components/topbar';
import Sidebar from './components/sidebar';
import Infobox from './components/infobox';
import styles from './styles/creditpage.module.css';


const Homepage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <TopBar />
      
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.content}>
        <h1>Welcome to your credits page!</h1>
        <Infobox className={styles.infobalance} header="Credits Balance" body = "Your credit balance is <Import Credit Here>" />
        <Infobox className={styles.infonotice} header="Important Notice" body="You will receive 100 credits prior to your first registration" />
        <Infobox className={styles.infotip} header="Tips" body="You can earn credits via uploading contents, participating in forum, rate the sections" />
        <Infobox className={styles.infotransaction} header="Credit Transactions" body="Will be implement later..." />
        </div>
      </div>
    </div>
  );
};
export default Homepage;