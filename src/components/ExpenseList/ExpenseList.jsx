import React, { useState, useEffect } from 'react';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import styles from './ExpenseList.module.css';
import NoDataCard from '../NoDataCard/NoDataCard';
import ExpenseListHeader from '../ExpenseListHeader/ExpenseListHeader';

// ExpenseList.jsx - Displays and manages the list of expenses, including sorting and filtering
const ExpenseList = ({
	data,
	handleOpenFormModal,
	handleEditForm,
	handleCloseModal,
	setEditData,
}) => {
	// State for the currently displayed data
	const [currentData, setCurrentData] = useState(data);

	// State for sorting order and column
	const [sort, setSort] = useState('asc');
	const [column, setColumn] = useState('all');

	// State for filter field and filter values
	const [field, setField] = useState(null);
	const [filter, setFilter] = useState(null);

	// State to show/hide the filter UI
	const [showFilter, setShowFilter] = useState(false);

	// Update currentData when the main data changes
	useEffect(() => {
		setCurrentData(data);
	}, [data]);

	// Sort the data by a given column and order
	const handleSortByColumn = (column, order) => {
		const sortedData = [...currentData].sort((a, b) => {
			if (order === 'asc') {
				setSort('desc');
				setColumn(column);
				if (a[column] < b[column]) {
					return -1;
				}
				if (a[column] > b[column]) {
					return 1;
				}
				return 0;
			} else if (order === 'desc') {
				setSort('asc');
				setColumn(column);
				if (a[column] < b[column]) {
					return 1;
				}
				if (a[column] > b[column]) {
					return -1;
				}
				return 0;
			}
		});

		setCurrentData(sortedData);
	};

	// Handle change of filter field (Amount, Date, Category)
	const handleFieldChange = (e) => {
		setField(e.target.value);
		setFilter({
			from: null,
			to: null,
			field: null,
		});
	};

	// Extract unique categories from the data for filtering
	const categories = data.map((element) => {
		return element.category;
	});
	const uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);

	// Handle changes to filter values
	const handleFieldValueChange = (e) => {
		setFilter((previous) => ({
			...previous,
			[e.target.name]: e.target.value,
		}));
	};

	// Toggle the filter UI
	const handleShowFilter = () => {
		setShowFilter((prev) => !prev);
	};

	// Apply the selected filter to the data
	const handleApplyFilter = () => {
		const filteredData = data.filter((expense) => {
			if (field === 'Amount') {
				if (!filter.to) {
					filter.to = Infinity;
				}
				if (!filter.from) {
					filter.from = 0;
				}
				return expense.amount >= filter.from && expense.amount <= filter.to;
			} else if (field === 'Date') {
				if (!filter.to) {
					filter.to = '31-12-9999';
				}
				if (!filter.from) {
					filter.from = '01-01-1900';
				}
				return expense.date >= filter.from && expense.date <= filter.to;
			} else if (field === 'Category') {
				return expense.category === filter.category;
			}
		});
		setCurrentData(filteredData);
	};

	// Reset all filters and show all data
	const handleFilterReset = () => {
		setFilter();
		setField('');
		setCurrentData(data);
	};

	return (
		<section className={styles.expenseList}>
			{/* Header with filter and sort controls */}
			<ExpenseListHeader
				handleCloseModal={handleCloseModal}
				handleOpenModal={handleOpenFormModal}
				handleSortByColumn={handleSortByColumn}
				field={field}
				filter={filter}
				sort={sort}
				column={column}
				handleFieldChange={handleFieldChange}
				handleFieldValueChange={handleFieldValueChange}
				handleApplyFilter={handleApplyFilter}
				handleFilterReset={handleFilterReset}
				categories={uniqueCategories}
				handleShowFilter={handleShowFilter}
				showFilter={showFilter}
			/>

			{/* Render the list of expenses or a no-data message */}
			{currentData && currentData.length > 0 ? (
				<section aria-label="Expenses">
					<ul className={styles.list}>
						{currentData.map((expense) => (
							<li key={expense.id}>
								<ExpenseCard
									expense={expense}
									handleEditForm={handleEditForm}
									setEditData={setEditData}
								/>
							</li>
						))}
					</ul>
				</section>
			) : (
				<NoDataCard>There are no expenses registred yet</NoDataCard>
			)}
		</section>
	);
};

export default ExpenseList;
