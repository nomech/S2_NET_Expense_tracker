import styles from './FilterBy.module.css';
import SelectFields from '../SelectFields/SelectFields';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

// Displays filter controls for expenses (amount, date, category)
const FilterBy = ({
	field,
	filter,
	handleFieldChange,
	handleFieldValueChange,
	handleApplyFilter,
	categories,
	handleFilterReset,
}) => {
	const options = ['Amount', 'Date', 'Category'];

	return (
		<div className={styles.filterContainer}>
			{/* Select field for filter type */}
			<SelectFields
				name={'field'}
				id={'field'}
				value={field}
				options={options}
				handleOnChange={handleFieldChange}
			/>
			{/* Show range inputs for amount filter */}
			{field == 'Amount' && (
				<>
					<InputField
						type="number"
						name="from"
						placeholder="From"
						handleOnChange={handleFieldValueChange}
						value={filter.from}
					/>
					<InputField
						type="number"
						name="to"
						placeholder="To"
						handleOnChange={handleFieldValueChange}
						value={filter.to}
					/>
				</>
			)}
			{/* Show date range inputs for date filter */}
			{field == 'Date' && (
				<>
					<p>From</p>
					<InputField
						type="date"
						name="from"
						value={filter.from}
						handleOnChange={handleFieldValueChange}
					/>
					<p>To</p>
					<InputField
						type="date"
						name="to"
						value={filter.to}
						handleOnChange={handleFieldValueChange}
					/>
				</>
			)}
			{/* Show category select for category filter */}
			{field == 'Category' && (
				<>
					<SelectFields
						name={'category'}
						id={'category'}
						value={filter.category}
						options={categories}
						handleOnChange={handleFieldValueChange}
					/>
				</>
			)}
			{/* Show apply and reset buttons if a filter is selected */}
			{field && (
				<>
					<Button handleAction={handleApplyFilter} type="filter">
						Apply
					</Button>
					<Button handleAction={handleFilterReset}>X Reset</Button>
				</>
			)}
		</div>
	);
};

export default FilterBy;
