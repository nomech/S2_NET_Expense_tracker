import React from 'react';
import styles from './FormModal.module.css';
import ExpenseForm from '../ExpenseForm/ExpenseForm';

// Modal wrapper for displaying the ExpenseForm
const FormModal = ({ handleCloseModal, handleSubmit, editData, editMode }) => {
	return (
		// Modal overlay containing the expense form
		<div className={styles.modal}>
			<ExpenseForm
				handleCloseModal={handleCloseModal}
				handleSubmit={handleSubmit}
				editData={editData}
				editMode={editMode}
			/>
		</div>
	);
};

export default FormModal;
