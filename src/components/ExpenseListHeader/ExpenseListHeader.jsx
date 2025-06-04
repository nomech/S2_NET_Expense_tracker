import styles from './ExpenseListHeader.module.css';
import Button from '../Button/Button';
import FilterBy from '../FilterBy/FilterBy';
import HeaderItem from '../HeaderItem/HeaderItem';
import InfoBox from '../InfoBox/InfoBox';
import filterIcon from '../../assets/icons/filter.svg';
import addIcon from '../../assets/icons/add.svg';

const ExpenseListHeader = ({
	handleOpenModal,
	handleSortByColumn,
	field,
	filter,
	sort,
	column,
	handleFieldChange,
	handleFieldValueChange,
	handleApplyFilter,
	categories,
	handleFilterReset,
	handleShowFilter,
	showFilter,
}) => {

	// Define the headers for the expense list
	const headers = ['title', 'amount', 'date', 'category'];

	return (
		<header>

			{/* filter toggle and add new expense button */}
			<nav className={styles.listPanel} aria-label="Expense actions">
				<Button handleAction={handleShowFilter} type="filter">
					<img src={filterIcon} alt="Filter Icon" /> Filter
				</Button>

				{/* Show filter controls if toggled on */}
				{showFilter && (
					<FilterBy
						field={field}
						filter={filter}
						handleFieldChange={handleFieldChange}
						handleFieldValueChange={handleFieldValueChange}
						handleApplyFilter={handleApplyFilter}
						categories={categories}
						handleFilterReset={handleFilterReset}
					/>
				)}
				<Button handleAction={handleOpenModal} type="new">
					<img src={addIcon} alt="Add icon" /> New Expense
				</Button>
			</nav>
			
			{/* Info box for user guidance */}
			<InfoBox text="You can click on each header to sort" />
			
			{/* Table/list headers for sorting */}
			<div className={styles.listHeader} role="row">
				{headers &&
					headers.map((header, index) => {
						return (
							<HeaderItem
								key={index}
								name={header}
								handleSortByColumn={handleSortByColumn}
								sort={sort}
								column={column}
							/>
						);
					})}

				<p className={styles.action}>Action</p>
			</div>
		</header>
	);
};

export default ExpenseListHeader;
