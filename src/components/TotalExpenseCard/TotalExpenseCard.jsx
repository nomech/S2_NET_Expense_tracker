import React from "react";
import styles from "./TotalExpenseCard.module.css";

const TotalExpenseCard = ({ data }) => {
  const calculatedTotalExpense = [...data]
    .map((expense) => {
      return expense.amount;
    })
    .reduce((total, expense) => {
      return total + expense;
    }, 0);

  const totalExpense = new Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format(calculatedTotalExpense);

  return (
    <div className={styles.totalExpense}>
      <h2 className={styles.totalHeading}>Total</h2>
      <p>{totalExpense} 💸</p>
    </div>
  );
};

export default TotalExpenseCard;
