import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, handleAction, type = "", buttonType }) => {
  return (
    <button
      className={`${styles.default} ${styles[type]}`}
      onClick={handleAction}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
