"use client";
import React from "react";
import styles from "../styles/forumbox.module.css";

interface ForumboxProps {
  header: string;
  body: string;
  className?: string;
  placeholder: string;
  button: String;
}

const Forumbox: React.FC<ForumboxProps> = ({ header, body, className, placeholder, button}) => {
  // Split the body content by newline (\n) and render each part with a <br />
  const formattedBody = body.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < body.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`${styles.infobox} ${className ?? ""}`}>
      <div className={styles["infobox-header"]}>{header}</div>
      <div className={styles["infobox-body"]}>{formattedBody}</div>
      <textarea
        className={styles["forum-box"]}
        placeholder={placeholder} // Ensure placeholder is passed here
      />
      <div className={styles['upload-button']}>{button}</div>
    </div>
  );
};

export default Forumbox;
