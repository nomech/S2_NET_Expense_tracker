import React from 'react';
import styles from './StatsCards.module.css';
import StatCard from '../StatCard/StatCard';

// Displays a set of statistic cards for expenses
const StatsCards = ({ data }) => {
	return (
		// Container for all statistics cards
		<section className={styles.statsContainer} aria-label="Statistics">
			{/* Total expenses, biggest expense, and most expensive category */}
			<StatCard data={data} title={'Total expenses'} stat={'total'} />
			<StatCard data={data} title={'biggest expense'} stat={'max'} />
			<StatCard data={data} title={'Most expenses'} stat={'category'} />
		</section>
	);
};

export default StatsCards;
