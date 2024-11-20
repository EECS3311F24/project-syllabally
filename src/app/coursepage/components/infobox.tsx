// components/infobox.tsx

"user client";
import React from 'react';
import styles from '../styles/infobox.module.css'; //Import the css module

interface InfoBoxProps {
    header: string;
    body: string;
    className?: string;
    dropdownOptions?: string[];
}

const InfoBox: React.FC<InfoBoxProps> = ({header, body, className,dropdownOptions}) =>{
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
            
            {/* Render dropdown if options are provided */}
            {dropdownOptions && (
                <div className={styles.dropdownContainer}>
                    <label htmlFor="dropdown" className={styles.dropdownLabel}>Choose an option:</label>
                    <select id="dropdown" className={styles.dropdown}>
                        {dropdownOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                         ))}
                    </select>
                </div>
            )}
        </div>      
      );
};
export default InfoBox;