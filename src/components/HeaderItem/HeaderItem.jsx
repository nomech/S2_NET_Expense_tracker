import React from "react";
import sortIcon from "../../assets/icons/sort.svg";
import sortUp from "../../assets/icons/sort-up.svg";
import sortDown from "../../assets/icons/sort-down.svg";
import styles from "./HeaderItem.module.css";

const HeaderItem = ({ name, handleSortByColumn, sort, column }) => {
  return (
    <div className={styles.column}>
      <p onClick={() => handleSortByColumn(name, sort)}>{name}</p>
      {column === "all" && (
        <img className={styles.icons} src={sortIcon} alt="Sort icon" />
      )}
      {column === name && sort === "asc" && (
        <img className={styles.icons} src={sortUp} alt="Sort icon" />
      )}
      {column === name && sort === "desc" && (
        <img className={styles.icons} src={sortDown} alt="Sort icon" />
      )}
    </div>
  );
};

export default HeaderItem;
