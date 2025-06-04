import React from 'react';
import styles from './InputField.module.css';

// Reusable input field for forms
const InputField = ({
	label,
	type,
	name,
	placeholder,
	handleOnChange,
	errorMessage,
	value = '',
}) => {
	return (
		<div className={styles.formGroup}>
			{/* Label for the input field */}
			<label htmlFor={name}>{label}</label>

			{/* Input element for user data */}
			<input
				className={`${styles.input}`}
				name={name}
				id={name}
				type={type}
				placeholder={placeholder}
				onChange={handleOnChange}
				value={value}
			/>

			{/* Show error message if present */}
			<p className={`${errorMessage ? styles.error : ''}`}>{errorMessage}</p>
		</div>
	);
};

export default InputField;
