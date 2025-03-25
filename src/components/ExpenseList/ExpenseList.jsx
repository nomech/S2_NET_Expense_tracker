import React, { useEffect, useState } from "react";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import styles from "./ExpenseList.module.css";
import NoDataCard from "../NoDataCard/NoDataCard";
import ExpenseListHeader from "../ExpenseListHeader/ExpenseListHeader";

const ExpenseList = ({
  data,
  handleOpenFormModal,
  handleEditForm,
  handleCloseModal,
  setEditData,
}) => {
  const [currentData, setCurrentData] = useState(data);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

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
      <ExpenseListHeader
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenFormModal}
        handleSortByColumn={handleSortByColumn}
      />
      {currentData.length > 0 ? (
        currentData.map((expense) => {
          return (
            <ExpenseCard
              expense={expense}
              key={expense.id}
              handleEditForm={handleEditForm}
              setEditData={setEditData}
            />
          );
        })
      ) : (
        <NoDataCard>There are no expenses registred yet</NoDataCard>
      )}
    </div>
  );
};

export default ExpenseList;
