import React from 'react';
import styles from './Banner.module.css';

// Displays the main banner with title and subtitle
const Banner = ({ title, subtext }) => {
	return (
		<header className={styles.banner}>
			{/* Main title of the app */}
			<h1 className={styles.bannerTitle}>{title}</h1>

			{/* Subtitle or description */}
			<p className={styles.bannerSubText}>{subtext}</p>
		</header>
	);
};

export default Banner;
