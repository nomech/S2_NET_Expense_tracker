import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, type, name, placeholder, handleOnChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="expense">{label}</label>
      <input
        className={styles.input}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default InputField;
