import React from 'react';
import Button from '../Button/Button';
import styles from './ConfirmModal.module.css';

// Modal dialog for confirming deletion of an expense
const ConfirmModal = ({ title, handleDeleteOnClick, handleCloseConfirmModal }) => {
	return (
		// Modal overlay for delete confirmation
		<div className={styles.confirmModal}>
			<div className={styles.deleteContainer}>
				<h2>Delete Expense</h2>

				{/* Confirmation message with expense title */}
				<p>Are you sure want to delete {title}</p>
				<div className={styles.buttonGroup}>
					{/* Button to confirm deletion */}
					<Button type={'delete'} handleAction={handleDeleteOnClick}>
						Delete
					</Button>

					{/* Button to cancel and close modal */}
					<Button type={'cancel'} handleAction={handleCloseConfirmModal}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
