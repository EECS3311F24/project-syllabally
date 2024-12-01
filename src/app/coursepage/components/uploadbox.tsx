// components/infobox.tsx

"user client";
import React from 'react';
import styles from '../styles/uploadbox.module.css'; //Import the css module

interface InfoBoxProps {
    header: string;
    body: string;
    className?: string;
    button: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({header, body, className, button}) =>{
    //Split body content by newline (\n) and render each part with <br />
    const formattedBody = body.split('\\n').map((line, index)=> (
        <React.Fragment key = {index}>
            {line}
            {index < body.split('\\n').length - 1 && <br />}
        </React.Fragment>
    ));
    return (
        <div className={`${styles.infobox} ${className ?? ''}`}>
            <div className={styles['infobox-header']}>{header}</div>
            <div className={styles['infobox-body']}>{formattedBody}</div>
            <div className={styles['upload-button']}>{button}</div>
        </div>      
      );
};
export default InfoBox;