import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import SelectFields from "../SelectFields/SelectFields";

const ExpenseForm = ({ handleSubmit, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    expense: "",
    amount: "",
    date: "",
    category: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const options = [
    "housing",
    "utility",
    "groceries",
    "transportation",
    "other",
  ];
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          label="Expense name"
          type="text"
          name="expense"
          placeholder="Name of the expense"
          value={formData.expense}
          handleOnChange={handleOnChange}
        />
        <InputField
          label="Amount"
          type="number"
          name="amount"
          placeholder="ex. 200"
          value={formData.amount}
          handleOnChange={handleOnChange}
        />

        <InputField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          handleOnChange={handleOnChange}
        />
        <SelectFields
          name="category"
          options={options}
          value={formData.category}
          handleOnChange={handleOnChange}
        />

        <div className={styles.buttonGroup}>
          <Button>Add</Button>
          <Button handleAction={handleCloseModal}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
