import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ handleCloseModal }) => {
  return (
    <div className={styles.modal}>
      <p className={styles.form}>HELLO!</p>
      <Button handleAction={handleCloseModal}>Close</Button>
      <Button>Add</Button>
    </div>
  );
};

export default Modal;
  