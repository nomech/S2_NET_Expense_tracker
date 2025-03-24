import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";
import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import SelectFields from "../SelectFields/SelectFields";

const ExpenseForm = ({ handleCloseModal }) => {
  const [formData, setFormData] = useState({
    expense: "",
    amount: "",
    date: "",
    category: "",
  });

  const [formError, setFormError] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const validateSubmission = (data) => {
    console.log(data);
    const errors = {};

    !data.expense.trim()
      ? (errors.expense = "You need to give the expense a name")
      : null;

    !data.amount.trim() ? (errors.amount = "You need to add an amount") : null;

    !data.date.trim() ? (errors.date = "Please select a date") : null;
    !data.category.trim()
      ? (errors.category = "Please select a category")
      : null;

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateSubmission(formData)) {
      try {
        setIsAdding(true);
        const db = getFirestore(firebaseApp);
        await addDoc(collection(db, "expenses"), formData);
      } catch (error) {
        console.error("Error adding data to database", error);
      } finally {
        setIsAdding(false);
        handleCloseModal();
      }
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          errorMessage={formError.expense}
        />
        <InputField
          label="Amount"
          type="number"
          name="amount"
          placeholder="ex. 200"
          value={formData.amount}
          handleOnChange={handleOnChange}
          errorMessage={formError.amount}
        />

        <InputField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          handleOnChange={handleOnChange}
          errorMessage={formError.date}
        />
        <SelectFields
          name="category"
          options={options}
          value={formData.category}
          handleOnChange={handleOnChange}
          errorMessage={formError.category}
        />

        <div className={styles.buttonGroup}>
          <Button isAdding={isAdding}>Add</Button>
          <Button handleAction={handleCloseModal} isAdding={isAdding}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
