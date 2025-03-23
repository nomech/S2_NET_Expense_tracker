import React, { useState } from "react";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ data }) => {
  const [currentData, setCurrentData] = useState(data);
  const [sort, setSort] = useState("asc");

  const handleSortByColumn = (column) => {
    const sortedData = [...currentData].sort((a, b) => {
      if (sort === "asc") {
        setSort("desc");
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      } else if (sort === "desc") {
        setSort("asc");
        if (a[column] < b[column]) {
          return 1;
        }
        if (a[column] > b[column]) {
          return -1;
        }
        return 0;
      }
    });

    setCurrentData(sortedData);
  };

  return (
    <div className={styles.expenseList}>
      <div className={styles.listHeader}>
        <p onClick={() => handleSortByColumn("title")}>Title</p>
        <p onClick={() => handleSortByColumn("amount")}>Amount</p>
        <p onClick={() => handleSortByColumn("date")}>Date</p>
        <p onClick={() => handleSortByColumn("category")}>Category</p>
        <p>Action</p>
      </div>
      {currentData &&
        currentData.map((expense) => {
          return <ExpenseCard expense={expense} key={expense.id} />;
        })}
    </div>
  );
};

export default ExpenseList;
