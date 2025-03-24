import React from "react";
import styles from "./SelectFields.module.css";

const SelectFields = ({ name, options, handleOnChange, errorMessage }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="category">Category</label>
      <select
        className={styles.input}
        name={name}
        id={name}
        defaultValue=""
        onChange={handleOnChange}
      >
        <option className={styles.option} value="">
          Select category
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
      <p className={styles.error}>{errorMessage}</p>
    </div>
  );
};

export default SelectFields;
