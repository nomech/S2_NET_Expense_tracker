import React from "react";
import styles from "./InputField.module.css";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  handleOnChange,
  errorMessage,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        className={`${styles.input}`}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      <p className={`${errorMessage ? styles.error : ""}`}>{errorMessage}</p>
    </div>
  );
};

export default InputField;
