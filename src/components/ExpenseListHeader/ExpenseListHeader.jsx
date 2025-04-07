import styles from "./ExpenseListHeader.module.css";
import Button from "../Button/Button";
import FilterBy from "../FilterBy/FilterBy";

const ExpenseListHeader = ({
  handleOpenModal,
  handleSortByColumn,
  field,
  filter,
  handleFieldChange,
  handleFieldValueChange,
  handleApplyFilter,
  categories,
  handleFilterReset,
  handleShowFilter,
  showFilter,
}) => {
  return (
    <>
      <div className={styles.listPanel}>
        <Button handleAction={handleShowFilter}>Filter by</Button>
        {showFilter && (
          <FilterBy
            field={field}
            filter={filter}
            handleFieldChange={handleFieldChange}
            handleFieldValueChange={handleFieldValueChange}
            handleApplyFilter={handleApplyFilter}
            categories={categories}
            handleFilterReset={handleFilterReset}
          />
        )}
        <Button handleAction={handleOpenModal} type="new">
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
