// components/infobox.tsx

"user client";

import styles from '../styles/infobox.module.css'; //Import the css module

interface InfoBoxProps {
    header: string;
    body: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({header, body}) =>{
    return (
        <div className={styles.infobox}>
            <div className={styles['infobox-header']}>{header}</div>
            <div className={styles['infobox-body']}>{body}</div>
        </div>
      );
};
export default InfoBox;