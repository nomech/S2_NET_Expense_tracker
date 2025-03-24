import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, handleAction, type = "", isAdding }) => {
  return (
    <button
      className={`${styles.default} ${styles[type]} ${
        isAdding ? styles.isAdding : ""
      }`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
};

export default Button;
