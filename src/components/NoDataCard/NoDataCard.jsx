import React from 'react';
import styles from './NoDataCard.module.css';

// Displays a message when there is no data to show
const NoDataCard = ({ children }) => {
	return (
		<section className={styles.noDataCard} aria-live="polite">
			{/* Message for no data */}
			<h3>{children}</h3>
		</section>
	);
};

export default NoDataCard;
