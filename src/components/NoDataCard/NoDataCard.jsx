import React from 'react';
import styles from './NoDataCard.module.css';

const NoDataCard = ({ children }) => {
	return (
		<section className={styles.noDataCard} aria-live="polite">
			<h3>{children}</h3>
		</section>
	);
};

export default NoDataCard;
