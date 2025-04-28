import styles from "./ExpenseListHeader.module.css";
import Button from "../Button/Button";
import FilterBy from "../FilterBy/FilterBy";
import HeaderItem from "../HeaderItem/HeaderItem";
import InfoBox from "../InfoBox/InfoBox";

const ExpenseListHeader = ({
  handleOpenModal,
  handleSortByColumn,
  field,
  filter,
  sort,
  column,
  handleFieldChange,
  handleFieldValueChange,
  handleApplyFilter,
  categories,
  handleFilterReset,
  handleShowFilter,
  showFilter,
}) => {
  const headers = ["title", "amount", "date", "category"];

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
      <InfoBox text="You can click on each header to sort" />
      <div className={styles.listHeader}>
        {headers &&
          headers.map((header, index) => {
            return (
              <HeaderItem
                key={index}
                name={header}
                handleSortByColumn={handleSortByColumn}
                sort={sort}
                column={column}
              />
            );
          })}
        <p>Action</p>
      </div>
    </>
  );
};

export default ExpenseListHeader;
