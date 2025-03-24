import React from "react";
import styles from "./NoDataCard.module.css";

const NoDataCard = ({ children }) => {
  return (
    <div className={styles.noDataCard}>
      <h3>{children}</h3>
    </div>
  );
};

export default NoDataCard;
