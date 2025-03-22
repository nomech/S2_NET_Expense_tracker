import React from "react";
import styles from "./ExpenseCard.module.css";

import Button from "../Button/Button";

const ExpenseCard = ({ expense }) => {
  const amount = new Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format(expense.amount);

  return (
    <div className={styles.card}>
      <p className={styles.title}>{expense.title}</p>
      <p>{amount}</p>
      <p>{expense.date}</p>
      <p>{expense.category}</p>
      <div className={styles.buttonGroup}>
        <Button type={"edit"}> Edit </Button>
        <Button type={"delete"}> Delete </Button>
      </div>
    </div>
  );
};

export default ExpenseCard;
