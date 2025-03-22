import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, handleAction, type = "" }) => {
  return (
    <button
      className={`${styles.default} ${styles[type]}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
};

export default Button;
