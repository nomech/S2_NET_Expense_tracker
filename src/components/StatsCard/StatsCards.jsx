import React from "react";
import StatCard from "../StatCard/StatCard";
import styles from "./StatsCards.module.css";

const statsCards = ({ data }) => {
  return (
    <div className={styles.statsContainer}>
      <StatCard data={data} title={"Total"} stat={"total"} />
      <StatCard data={data} title={"biggest Expense"} stat={"max"} />
      <StatCard data={data} title={"Avg. Category"} stat={"category"} />
    </div>
  );
};

export default statsCards;
