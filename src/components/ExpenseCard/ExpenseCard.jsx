import React, { useState } from "react";
import styles from "./ExpenseCard.module.css";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";
import Button from "../Button/Button";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ExpenseCard = ({ expense, setIsDeleting }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const amount = new Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format(expense.amount);

  const handleDeleteOnClick = async (id) => {
    try {
      setIsDeleting(true);
      const db = getFirestore(firebaseApp);
      await deleteDoc(doc(db, "expenses", id));
      setShowConfirmModal(false);
    } catch (error) {
      console.error("error deleting expense", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleOpenConfirmModal = () => {
    !showConfirmModal ? setShowConfirmModal(true) : null;
  };

  const handleCloseConfirmModal = () => {
    showConfirmModal ? setShowConfirmModal(false) : null;
  };

  return (
    <>
      <div className={styles.card}>
        <p className={styles.title}>{expense.title}</p>
        <p>{amount}</p>
        <p>{expense.date}</p>
        <p>{expense.category}</p>
        <div className={styles.buttonGroup}>
          <Button type={"edit"}> 📝 Edit </Button>
          <Button type={"delete"} handleAction={handleOpenConfirmModal}>
            🗑️ Delete
          </Button>
        </div>
      </div>
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
