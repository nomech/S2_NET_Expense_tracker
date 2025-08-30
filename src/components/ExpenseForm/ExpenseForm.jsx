import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from './ExpenseForm.module.css';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import SelectFields from '../SelectFields/SelectFields';
import { useAuth } from '../../context/authContext';
import { Timestamp } from 'firebase/firestore';

// ExpenseForm.jsx - Handles adding and editing expenses
const ExpenseForm = ({ handleCloseModal, editData, editMode }) => {
	// Local state for form data and validation errors
	const [formData, setFormData] = useState(editData);
	const [formError, setFormError] = useState({});
	// State for async error message
	const [errorMessage, setErrorMessage] = useState('');

	// auth (for uid-scoped writes)
	const { user } = useAuth(); // <-- ADDED

	// Validate form fields before submission
	const validateSubmission = (data) => {
		const errors = {};
		// Title is required
		if (!data.title?.trim()) {
			errors.title = 'Expense name is required.';
		}
		// Amount must be a positive number
		if (data.amount === '' || Number(data.amount) <= 0) {
			errors.amount = 'Amount must be a positive number.';
		}
		// Date is required
		if (!data.date) {
			errors.date = 'Please select a date.';
		}
		// Category is required
		if (!data.category?.trim()) {
			errors.category = 'Please select a category.';
		}
		setFormError(errors);
		return Object.keys(errors).length === 0;
	};

	// Handle form submission for add or edit
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user?.uid) {
			setErrorMessage('Not signed in.');
			return;
		}

		if (validateSubmission(formData)) {
			// Normalize date: handle both string and Firestore Timestamp
			let parsedDate = null;

			if (formData.date instanceof Timestamp) {
				parsedDate = formData.date; // already Timestamp ✅
			} else if (typeof formData.date === 'string' && formData.date.trim() !== '') {
				parsedDate = Timestamp.fromDate(new Date(formData.date)); // string → Date → Timestamp ✅
			} else {
				parsedDate = null; // optional: allow missing date
			}

			// Build clean payload
			const payloadBase = {
				title: String(formData.title || '').trim(),
				amount: Number(formData.amount),
				category: String(formData.category || '').trim(),
				date: parsedDate,
			};

			try {
				if (!editMode) {
					// Add new expense
					await addDoc(collection(db, 'users', user.uid, 'expenses'), {
						...payloadBase,
						createdAt: serverTimestamp(),
					});
				} else {
					// Update existing expense
					const expenseRef = doc(db, 'users', user.uid, 'expenses', editData.id);
					await updateDoc(expenseRef, payloadBase);
				}

				setErrorMessage('');
				handleCloseModal();
			} catch (error) {
				console.error('Firestore write error', error);
				setErrorMessage(
					editMode
						? 'Failed to update expense. Please try again.'
						: 'Failed to add expense. Please try again.'
				);
			}
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
						value={
							formData.date
								? formData.date.seconds // Firestore Timestamp -> ISO date string
									? new Date(formData.date.seconds * 1000)
											.toISOString()
											.split('T')[0]
									: formData.date // Already a string for new expenses
								: ''
						}
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
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
