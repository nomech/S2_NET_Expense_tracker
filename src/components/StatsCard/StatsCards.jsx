import React from "react";
import StatCard from "../StatCard/StatCard";
import styles from "./StatsCards.module.css";

const statsCards = ({ data }) => {
  return (
    <div className={styles.statsContainer}>
      <StatCard data={data} title={"Total expenses"} stat={"total"} />
      <StatCard data={data} title={"biggest expense"} stat={"max"} />
      <StatCard data={data} title={"Most expenses"} stat={"category"} />
    </div>
  );
};

export default statsCards;
