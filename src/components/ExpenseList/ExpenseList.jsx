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
  const [currentData, setCurrentData] = useState();
  const [sort, setSort] = useState("asc");
  const [column, setColumn] = useState("all");
  const [field, setField] = useState();
  const [filter, setFilter] = useState();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleSortByColumn = (column, order) => {
    const sortedData = currentData.sort((a, b) => {
      console.log(column);
      console.log(sort);
      if (order === "asc") {
        setSort("desc");
        setColumn(column);
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      } else if (order === "desc") {
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

  const handleFieldChange = (e) => {
    setField(e.target.value);
    setFilter({
      from: null,
      to: null,
      field: null,
    });
  };

  const categories = data.map((element) => {
    return element.category;
  });

  const uniqueCategories = categories.filter(
    (item, index) => categories.indexOf(item) === index
  );

  const handleFieldValueChange = (e) => {
    setFilter((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleApplyFilter = () => {
    const filteredData = data.filter((expense) => {
      if (field === "Amount") {
        if (!filter.to) {
          filter.to = Infinity;
        }
        if (!filter.from) {
          filter.from = 0;
        }
        return expense.amount >= filter.from && expense.amount <= filter.to;
      } else if (field === "Date") {
        if (!filter.to) {
          filter.to = "31-12-9999";
        }
        if (!filter.from) {
          filter.from = "01-01-1900";
        }
        return expense.date >= filter.from && expense.date <= filter.to;
      } else if (field === "Category") {
        return expense.category === filter.category;
      }
    });
    setCurrentData(filteredData);
  };

  const handleFilterReset = () => {
    setFilter();
    setField("");
    setCurrentData(data);
  };

  return (
    <div className={styles.expenseList}>
      <ExpenseListHeader
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenFormModal}
        handleSortByColumn={handleSortByColumn}
        field={field}
        filter={filter}
        sort={sort}
        column={column}
        handleFieldChange={handleFieldChange}
        handleFieldValueChange={handleFieldValueChange}
        handleApplyFilter={handleApplyFilter}
        handleFilterReset={handleFilterReset}
        categories={uniqueCategories}
        handleShowFilter={handleShowFilter}
        showFilter={showFilter}
      />

      {currentData && currentData.length > 0 ? (
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
