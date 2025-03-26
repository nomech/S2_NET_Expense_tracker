import React from "react";
import styles from "./StartCard.module.css";

const TotalExpenseCard = ({ data, title = "Title", stat }) => {
  let statData = 0;

  const amounts = [...data].map((expense) => {
    return expense.amount;
  });

  const categories = [...data].map((expense) => {
    return expense.category;
  });

  const calculatedTotalExpense = amounts.reduce((total, expense) => {
    return total + expense;
  }, 0);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("no-NB", {
      style: "currency",
      currency: "NOK",
    }).format(amount);
  };

  if (stat == "total") {
    statData = formatAmount(calculatedTotalExpense);
  } else if (stat == "max") {
    statData = formatAmount(Math.max(...amounts));
  } else if (stat == "category") {
    let test = {};

    categories.forEach((category) => {
      console.log(category);
      if (!test[category]) {
        test[category] = 1;
      } else {
        test[category]++;
      }
    });

    console.log(test);

    statData = Object.keys(test).reduce((maxKey, currentKey) => {
      return test[currentKey] > test[maxKey] ? currentKey : maxKey;
    });
  }

  return (
    <div className={styles.totalExpense}>
      <h2 className={styles.totalHeading}>{title}</h2>
      <p className={styles.statData}>{statData}</p>
    </div>
  );
};

export default TotalExpenseCard;
