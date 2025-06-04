import React from 'react';
import styles from './SelectFields.module.css';

// Reusable select field for forms
const SelectFields = ({ name, label, options, handleOnChange, errorMessage, value = '' }) => {
	return (
		<div className={styles.formGroup}>
			{/* Label for the select field */}
			<label htmlFor="category">{label}</label>

			{/* Dropdown select element */}
			<select
				className={styles.input}
				name={name}
				id={name}
				value={value}
				onChange={handleOnChange}
			>
				<option className={styles.option} value="">
					Select
				</option>
				{/* Render options dynamically */}
				{options &&
					options.map((option) => {
						return (
							<option className={styles.option} value={option} key={option}>
								{option}
							</option>
						);
					})}
			</select>

			{/* Show error message if present */}
			<p className={`${errorMessage ? styles.error : ''}`}>{errorMessage}</p>
		</div>
	);
};

export default SelectFields;
