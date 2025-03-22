import ExpenseCard from "../ExpenseCard/ExpenseCard";

import React from "react";

const ExpenseList = ({ data }) => {
  console.log(data);
  
  return (
    <div>
      {data &&
        data.map((expense) => {
          
          <ExpenseCard expense={expense} key={expense.id} />;
        })}
    </div>
  );
};

export default ExpenseList;
