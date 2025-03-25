import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";
import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import SelectFields from "../SelectFields/SelectFields";

const ExpenseForm = ({ handleCloseModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const [formError, setFormError] = useState({});

  const validateSubmission = (data) => {
    const errors = {};

    !data.title.trim()
      ? (errors.title = "You need to give the expense a name")
      : null;
    !data.amount.trim() ? (errors.amount = "You need to add an amount") : null;
    !data.date.trim() ? (errors.date = "Please select a date") : null;
    !data.category.trim()
      ? (errors.category = "Please select a category")
      : null;

    data.amount = isNaN(data.amount.trim())
      ? data.amount
      : parseInt(data.amount, 10);
    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateSubmission(formData)) {
      try {
        const db = getFirestore(firebaseApp);
        await addDoc(collection(db, "expenses"), formData);
      } catch (error) {
        console.error("Error adding data to database", error);
      }
      handleCloseModal();
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      createdAt: serverTimestamp(),
    });
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
          name="title"
          placeholder="Name of the expense"
          handleOnChange={handleOnChange}
          errorMessage={formError.title}
        />
        <InputField
          label="Amount"
          type="number"
          name="amount"
          placeholder="ex. 200"
          handleOnChange={handleOnChange}
          errorMessage={formError.amount}
        />

        <InputField
          label="Date"
          type="date"
          name="date"
          handleOnChange={handleOnChange}
          errorMessage={formError.date}
        />
        <SelectFields
          name="category"
          options={options}
          handleOnChange={handleOnChange}
          errorMessage={formError.category}
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
