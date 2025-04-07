import styles from "./FilterBy.module.css";
import SelectFields from "../SelectFields/SelectFields";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

const FilterBy = ({
  field,
  filter,
  handleFieldChange,
  handleFieldValueChange,
  handleApplyFilter,
  categories,
  handleFilterReset,
}) => {
  const options = ["Amount", "Date", "Category"];

  return (
    <div className={styles.filterContainer}>
      <SelectFields
        name={"field"}
        id={"field"}
        value={field}
        options={options}
        handleOnChange={handleFieldChange}
      />

      {field == "Amount" && (
        <>
          <InputField
            type="number"
            name="from"
            placeholder="From"
            handleOnChange={handleFieldValueChange}
            value={filter.from}
          />
          <InputField
            type="number"
            name="to"
            placeholder="To"
            handleOnChange={handleFieldValueChange}
            value={filter.to}
          />
        </>
      )}
      {field == "Date" && (
        <>
          <p>From</p>
          <InputField
            type="date"
            name="from"
            value={filter.from}
            handleOnChange={handleFieldValueChange}
          />
          <p>To</p>
          <InputField
            type="date"
            name="to"
            value={filter.to}
            handleOnChange={handleFieldValueChange}
          />
        </>
      )}
      {field == "Category" && (
        <>
          <SelectFields
            name={"category"}
            id={"category"}
            value={filter.category}
            options={categories}
            handleOnChange={handleFieldValueChange}
          />
        </>
      )}
      {field && (
        <>
          <Button handleAction={handleApplyFilter} type="filter">
            Apply
          </Button>
          <Button handleAction={handleFilterReset}>X Reset</Button>
        </>
      )}
    </div>
  );
};

export default FilterBy;
