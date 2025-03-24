import React from "react";
import styles from "./Modal.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const Modal = ({ handleCloseModal, handleSubmit, setIsAdding }) => {
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

export default Modal;
