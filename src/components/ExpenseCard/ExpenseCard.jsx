import React, { useState } from 'react';
import styles from './ExpenseCard.module.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Button from '../Button/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import edit from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import { useAuth } from '../../context/authContext';

// Displays a single expense item with edit and delete actions
const ExpenseCard = ({ expense, handleEditForm }) => {
	// State to control the visibility of the delete confirmation modal
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	// State for error message
	const [errorMessage, setErrorMessage] = useState('');
	const { user } = useAuth();

	// Format the amount as currency (NOK)
	const amount = new Intl.NumberFormat('no-NB', {
		style: 'currency',
		currency: 'NOK',
	}).format(expense.amount);

	// Delete the expense from Firestore
	const handleDeleteOnClick = async (id) => {
		try {
			const ref = doc(db, 'users', user.uid, 'expenses', id); // ✅ correct path
			await deleteDoc(ref);
		} catch (error) {
			console.error('Error deleting expense', error);
		}
	};
	// Open the confirmation modal
	const handleOpenConfirmModal = () => {
		!showConfirmModal ? setShowConfirmModal(true) : null;
	};

	// Close the confirmation modal
	const handleCloseConfirmModal = () => {
		showConfirmModal ? setShowConfirmModal(false) : null;
	};

	return (
		<>
			{/* Display expense details and action buttons */}
			<article className={styles.card} aria-label={`Expense: ${expense.title}`}>
				<p className={styles.title}>{expense.title}</p>
				<p>{amount}</p>
				<p>{expense.date ? expense.date.toDate().toLocaleDateString('en-GB') : ''}</p>

				<p className={styles.category}>{expense.category}</p>
				<div className={styles.buttonGroup}>
					{/* Edit button opens the form modal in edit mode */}
					<Button type={'edit'} handleAction={() => handleEditForm(expense)}>
						<img className={styles.buttonIcon} src={edit} alt="Edit icon" />
						Edit
					</Button>

					{/* Delete button opens the confirmation modal */}
					<Button type={'delete'} handleAction={handleOpenConfirmModal}>
						<img className={styles.buttonIcon} src={deleteIcon} alt="Delete icon" />{' '}
						Delete
					</Button>
				</div>
				{/* Show error message if deletion fails */}
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
			</article>

			{/* Show confirmation modal if triggered */}
			{showConfirmModal && (
				<ConfirmModal
					title={expense.title}
					handleCloseConfirmModal={handleCloseConfirmModal}
					handleDeleteOnClick={() => handleDeleteOnClick(expense.id)}
				/>
			)}
		</>
	);
};

export default ExpenseCard;
