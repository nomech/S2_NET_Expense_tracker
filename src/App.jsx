//CSS
import "./App.css";

//Components
import Banner from "./components/Banner/Banner";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import TotalExpenseCard from "./components/totalExpenseCard/totalExpenseCard";
import FormModal from "./components/FormModal/FormModal";

// hooks, firebase, and react
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

function App() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [dbData, setDbData] = useState([]);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });
  const [editMode, SetEditMode] = useState(false);

  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const expenseCollection = collection(db, "expenses");
    const q = query(expenseCollection, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().map((change) => {
        return { changeType: change.type, id: change.doc.id };
      });

      const newData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setDbData(newData);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenFormModal = () => {
    !showExpenseModal ? setShowExpenseModal(true) : null;
  };

  const handleEditForm = (data) => {
    setEditData(data);
    SetEditMode(true);
    !showExpenseModal ? setShowExpenseModal(true) : null;
  };

  const handleCloseFormModal = () => {
    if (editMode) {
      setEditData({});
      SetEditMode(false);
    }
    showExpenseModal ? setShowExpenseModal(false) : null;
  };

  return (
    <>
      <Banner
        title={"Nomech's Expense Tracker (NET)"}
        subtext={"It's tracking time!"}
      />
      <TotalExpenseCard data={dbData} />
      <ExpenseList
        data={dbData}
        handleOpenFormModal={handleOpenFormModal}
        handleEditForm={handleEditForm}
        handleCloseModal={handleCloseFormModal}
      />
      {showExpenseModal && (
        <FormModal
          handleCloseModal={handleCloseFormModal}
          editData={editData}
          editMode={editMode}
        />
      )}
    </>
  );
}

export default App;
