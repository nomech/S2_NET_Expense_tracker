import React from "react";
import styles from "./InputField.module.css";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  handleOnChange,
  errorMessage,
  pattern,
}) => {
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
        pattern={pattern}
        required
      />
      <p className={styles.error}>{errorMessage}</p>
    </div>
  );
};

export default InputField;
