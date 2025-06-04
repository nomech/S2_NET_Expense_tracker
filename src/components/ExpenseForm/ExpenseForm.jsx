import React, { useState } from 'react';
import {
	collection,
	addDoc,
	getFirestore,
	serverTimestamp,
	doc,
	updateDoc,
} from 'firebase/firestore';
import firebaseApp from '../../firebaseConfig';
import styles from './ExpenseForm.module.css';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import SelectFields from '../SelectFields/SelectFields';

// ExpenseForm.jsx - Handles adding and editing expenses
const ExpenseForm = ({ handleCloseModal, editData, editMode }) => {
	// Local state for form data and validation errors
	const [formData, setFormData] = useState(editData);
	const [formError, setFormError] = useState({});

	// Validate form fields before submission
	const validateSubmission = (data) => {
		const errors = {};
		// Title is required
		if (!data.title.trim()) {
			errors.title = 'Expense name is required.';
		}
		// Amount must be a positive number
		if (!data.amount || Number(data.amount) <= 0) {
			errors.amount = 'Amount must be a positive number.';
		}
		// Date is required
		if (!data.date.trim()) {
			errors.date = 'Please select a date.';
		}
		// Category is required
		if (!data.category.trim()) {
			errors.category = 'Please select a category.';
		}

		// Convert amount to integer for storage
		data.amount = parseInt(data.amount, 10);

		setFormError(errors);

		return Object.keys(errors).length === 0;
	};

	// Handle form submission for add or edit
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateSubmission(formData)) {
			if (!editMode) {
				// Add new expense to Firestore
				formData.createdAt = serverTimestamp();
				try {
					const db = getFirestore(firebaseApp);
					await addDoc(collection(db, 'expenses'), formData);
				} catch (error) {
					console.error('Error adding data to database', error);
				}
			} else if (editMode) {
				// Update existing expense in Firestore
				try {
					const db = getFirestore(firebaseApp);
					const expenseRef = doc(collection(db, 'expenses'), editData.id);
					await updateDoc(expenseRef, formData);
				} catch (error) {
					console.error('Error editing data in database', error);
				}
			}
			handleCloseModal();
		}
	};

	// Handle input changes for all fields
	const handleOnChange = (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Expense categories for the select field
	const options = ['housing', 'utility', 'groceries', 'transportation', 'other'];

	return (
		<section className={styles.formContainer}>
			<form onSubmit={handleSubmit} className={styles.form} aria-label="Expense form">
				<fieldset>
					{/* Input for expense title */}
					<InputField
						label="Expense name"
						type="text"
						name="title"
						value={formData.title}
						placeholder="Name of the expense"
						handleOnChange={handleOnChange}
						errorMessage={formError.title}
					/>
					{/* Input for amount */}
					<InputField
						label="Amount"
						type="number"
						name="amount"
						value={formData.amount}
						placeholder="ex. 200"
						handleOnChange={handleOnChange}
						errorMessage={formError.amount}
					/>

					{/* Input for date */}
					<InputField
						label="Date"
						type="date"
						name="date"
						value={formData.date}
						handleOnChange={handleOnChange}
						errorMessage={formError.date}
					/>
					{/* Select for category */}
					<SelectFields
						name="category"
						label="Category"
						options={options}
						value={formData.category}
						handleOnChange={handleOnChange}
						errorMessage={formError.category}
					/>
				</fieldset>
				<div className={styles.buttonGroup}>
					{/* Button for confirming edit or adding new expense */}
					{editMode ? (
						<Button buttonType="submit" type="add">
							Confirm
						</Button>
					) : (
						<Button buttonType="submit" type="add">
							Add
						</Button>
					)}
					{/* Button to close the modal */}
					<Button buttonType="button" type="cancel" handleAction={handleCloseModal}>
						Close
					</Button>
				</div>
			</form>
		</section>
	);
};

export default ExpenseForm;
