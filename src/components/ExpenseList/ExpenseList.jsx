import ExpenseCard from "../ExpenseCard/ExpenseCard";
import styles from "./ExpenseList.module.css";

import React from "react";

const ExpenseList = ({ data }) => {
  console.log(data);

  return (
    <div className={styles.expenseList}>
      {data &&
        data.map((expense) => {
          return <ExpenseCard expense={expense} key={expense.id} />;
        })}
    </div>
  );
};

export default ExpenseList;
