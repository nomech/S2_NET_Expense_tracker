import React, { useState } from "react";
import SelectFields from "../SelectFields/SelectFields";
import InputField from "../InputField/InputField";

const FilterBy = ({ data }) => {
  const [field, setField] = useState();
  const [fieldValue, setFieldValue] = useState();

  const options = ["Amount", "Date", "Category"];

  const handleFieldChange = (e) => {
    setField(e.target.value);
    setFieldValue({
      from: 0,
      to: 0,
      category: "",
    });
  };

  const handleFieldValueChange = (e) => {
    console.log(fieldValue);
    setFieldValue((previous) => ({
      ...previous,
      [e.target.name]: [e.target.value],
    }));
  };

  return (
    <div>
      <SelectFields
        name={"Field"}
        id={"field"}
        defaultValue={""}
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
            value={fieldValue.from}
          />
          <InputField
            type="number"
            name="to"
            placeholder="To"
            handleOnChange={handleFieldValueChange}
            value={fieldValue.to}
          />
        </>
      )}
      {field == "Date" && (
        <>
          <InputField type="date" name="from" label="From" />
          <InputField type="date" name="to" label="To" />
        </>
      )}
      {field == "Category" && (
        <>
          <SelectFields
            name={"Field"}
            id={"field"}
            defaultValue={""}
            options={options}
          />
        </>
      )}
    </div>
  );
};

export default FilterBy;
