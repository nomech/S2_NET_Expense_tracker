import React from "react";
import styles from "./FormModal.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const FormModal = ({
  handleCloseModal,
  handleSubmit,
  setIsAdding,
}) => {
  return (
    <div className={styles.modal}>
      <ExpenseForm
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        setIsAdding={setIsAdding}
      />
    </div>
  );
};

export default FormModal;
