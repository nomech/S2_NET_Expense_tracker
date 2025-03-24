import React from "react";
import Button from "../Button/Button";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  title,
  handleDeleteOnClick,
  handleCloseConfirmModal,
}) => {
  return (
    <div className={styles.confirmModal}>
      <div className={styles.deleteContainer}>
        <h2>Delete Expense</h2>
        <p>Are you sure want to delete {title}</p>
        <div className={styles.buttonGroup}>
          <Button type={"delete"} handleAction={handleDeleteOnClick}>
            Delete
          </Button>
          <Button type={"cancel"} handleAction={handleCloseConfirmModal}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
