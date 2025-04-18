import React from "react";
import styles from "./StartCard.module.css";

const StatCard = ({ data, title = "Title", stat = "No data" }) => {
  let statData = 0;

  const amounts = data.map((expense) => {
    return expense.amount;
  });

  const categories = data.map((expense) => {
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
    statData =
      amounts.length > 0 ? formatAmount(Math.max(...amounts)) : formatAmount(0);
  } else if (stat == "category") {
    const categoriesAmount = {};

    data.forEach((expense) => {
      const { category, amount } = expense;
      if (categories.includes(category)) {
        categoriesAmount[category] = (categoriesAmount[category] || 0) + amount;
      }
    });

    if (Object.keys(categoriesAmount).length > 0) {
      statData = Object.keys(categoriesAmount).reduce((current, acc) => {
        return categoriesAmount[current] > categoriesAmount[acc] ? current : acc;
      });
    } else {
      statData = "No data";
    }
  }

  return (
    <div className={styles.totalExpense}>
      <h2 className={styles.totalHeading}>{title}</h2>
      <p className={styles.statData}>{statData}</p>
    </div>
  );
};

export default StatCard;
