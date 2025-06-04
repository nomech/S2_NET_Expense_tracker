import React from 'react';
import sortIcon from '../../assets/icons/sort.svg';
import sortUp from '../../assets/icons/sort-up.svg';
import sortDown from '../../assets/icons/sort-down.svg';
import styles from './HeaderItem.module.css';

// Displays a sortable column header for the expense list
const HeaderItem = ({ name, handleSortByColumn, sort, column }) => {
	return (
		<div className={`${styles.column} ${styles[name]}`}>
			{/* Column name, clickable for sorting */}
			<p onClick={() => handleSortByColumn(name, sort)}>{name}</p>
			{/* Show sort icon depending on state */}
			{column === 'all' && <img className={styles.icons} src={sortIcon} alt="Sort icon" />}
			{column === name && sort === 'asc' && (
				<img className={styles.icons} src={sortUp} alt="Sort icon" />
			)}
			{column === name && sort === 'desc' && (
				<img className={styles.icons} src={sortDown} alt="Sort icon" />
			)}
		</div>
	);
};

export default HeaderItem;
