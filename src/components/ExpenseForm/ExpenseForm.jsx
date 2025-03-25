import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";
import styles from "./ExpenseForm.module.css";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import SelectFields from "../SelectFields/SelectFields";

const ExpenseForm = ({ handleCloseModal, editData, editMode }) => {
  const [formData, setFormData] = useState(editData);
  const [formError, setFormError] = useState({});

  const validateSubmission = (data) => {
    const errors = {};
    if (!data.title.trim()) {
      errors.title = "Expense name is required.";
    }
    if (Number(data.amount) <= 0 || isNaN(Number(data.amount))) {
      errors.amount = "Amount must be a positive number.";
    }
    if (!data.date.trim()) {
      errors.date = "Please select a date.";
    }
    if (!data.category.trim()) {
      errors.category = "Please select a category.";
    }
    setFormError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateSubmission(formData)) {
      if (!editMode) {
        formData.createdAt = serverTimestamp();
        try {
          const db = getFirestore(firebaseApp);
          await addDoc(collection(db, "expenses"), formData);
        } catch (error) {
          console.error("Error adding data to database", error);
        }
      } else if (editMode) {
        try {
          const db = getFirestore(firebaseApp);
          const expenseRef = doc(collection(db, "expenses"), editData.id);
          await updateDoc(expenseRef, formData);
        } catch (error) {
          console.error("Error editing data in database", error);
        }
      }
      handleCloseModal();
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          value={formData.title}
          placeholder="Name of the expense"
          handleOnChange={handleOnChange}
          errorMessage={formError.title}
        />
        <InputField
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          placeholder="ex. 200"
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
          {editMode ? (
            <Button buttonType="submit">Confirm</Button>
          ) : (
            <Button buttonType="submit">Add</Button>
          )}
          <Button buttonType="button" handleAction={handleCloseModal}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
