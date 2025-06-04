import React from 'react';
import styles from './StartCard.module.css';

// StatCard.jsx - Displays a single statistic (total, max, or most expensive category)
const StatCard = ({ data, title = 'Title', stat = 'No data' }) => {
	let statData = 0;

	// Extract all amounts and categories from the data
	const amounts = data.map((expense) => {
		return expense.amount;
	});

	const categories = data.map((expense) => {
		return expense.category;
	});

	// Calculate the total expense
	const calculatedTotalExpense = amounts.reduce((total, expense) => {
		return total + expense;
	}, 0);

	// Format a number as currency (NOK)
	const formatAmount = (amount) => {
		return new Intl.NumberFormat('no-NB', {
			style: 'currency',
			currency: 'NOK',
		}).format(amount);
	};

	// Determine which statistic to display
	if (stat == 'total') {
		statData = formatAmount(calculatedTotalExpense);
	} else if (stat == 'max') {
		statData = amounts.length > 0 ? formatAmount(Math.max(...amounts)) : formatAmount(0);
	} else if (stat == 'category') {
		// Calculate the category with the highest total expense
		const categoriesAmount = {};

		data.forEach((expense) => {
			const { category, amount } = expense;
			if (categories.includes(category)) {
				categoriesAmount[category] = (categoriesAmount[category] || 0) + amount;
			}
		});

		if (Object.keys(categoriesAmount).length > 0) {
			statData = Object.keys(categoriesAmount).reduce((current, acc) => {
				return categoriesAmount[current] > categoriesAmount[acc] ? current : acc;
			});
		} else {
			statData = 'No data';
		}
	}

	return (
		// Card displaying the statistic
		<article className={styles.totalExpense} aria-label={title}>
			<h2 className={styles.totalHeading}>{title}</h2>
			<p className={styles.statData}>{statData}</p>
		</article>
	);
};

export default StatCard;
