import React from "react";
import styles from "./Banner.module.css";

const Banner = ({ title, subtext }) => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.bannerTitle}>{title}</h1>
      <p className={styles.bannerSubText}>{subtext}</p>
    </div>
  );
};

export default Banner;
