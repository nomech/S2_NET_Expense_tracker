import React from "react";
import styles from "./SelectFields.module.css";

const SelectFields = ({
  name,
  label,
  options,
  handleOnChange,
  errorMessage,
  value = "",
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="category">{label}</label>
      <select
        className={styles.input}
        name={name}
        id={name}
        value={value}
        onChange={handleOnChange}
      >
        <option className={styles.option} value="">
          Select
        </option>

        {options &&
          options.map((option) => {
            return (
              <option className={styles.option} value={option} key={option}>
                {option}
              </option>
            );
          })}
      </select>
      <p className={`${errorMessage ? styles.error : ""}`}>{errorMessage}</p>
    </div>
  );
};

export default SelectFields;
