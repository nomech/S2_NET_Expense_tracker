import React from "react";
import styles from "./ExpenseListHeader.module.css";
import Button from "../Button/Button";

const ExpenseListHeader = ({
  handleCloseModal,
  handleOpenModal,
  handleSortByColumn,
}) => {
  return (
    <>
      <div className={styles.listPanel}>
        <Button handleAction={handleCloseModal}>Add</Button>
        <Button handleAction={handleOpenModal} type="add">
          + New Expense
        </Button>
      </div>
      <div className={styles.listHeader}>
        <p
          className={styles.column}
          onClick={() => handleSortByColumn("title")}
        >
          Title
        </p>
        <p
          className={styles.column}
          onClick={() => handleSortByColumn("amount")}
        >
          Amount
        </p>
        <p className={styles.column} onClick={() => handleSortByColumn("date")}>
          Date
        </p>
        <p
          className={styles.column}
          onClick={() => handleSortByColumn("category")}
        >
          Category
        </p>
        <p>Action</p>
      </div>
    </>
  );
};

export default ExpenseListHeader;
