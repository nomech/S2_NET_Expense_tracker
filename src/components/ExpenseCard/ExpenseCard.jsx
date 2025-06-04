import React, { useState } from 'react';
import styles from './ExpenseCard.module.css';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from '../../firebaseConfig';
import Button from '../Button/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import edit from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

// Displays a single expense item with edit and delete actions
const ExpenseCard = ({ expense, handleEditForm }) => {
	// State to control the visibility of the delete confirmation modal
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	// Format the amount as currency (NOK)
	const amount = new Intl.NumberFormat('no-NB', {
		style: 'currency',
		currency: 'NOK',
	}).format(expense.amount);

	// Delete the expense from Firestore
	const handleDeleteOnClick = async (id) => {
		try {
			const db = getFirestore(firebaseApp);
			await deleteDoc(doc(db, 'expenses', id));
			setShowConfirmModal(false);
		} catch (error) {
			console.error('error deleting expense', error);
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
				<p>{expense.date}</p>
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
