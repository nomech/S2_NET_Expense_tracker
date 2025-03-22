import React from "react";
//import styles from "./Button.module.css"

const Button = ({ children, handleAction }) => {
  return <button onClick={handleAction}>{children}</button>;
};

export default Button;
