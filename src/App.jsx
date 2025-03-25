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

  const handleOpenModal = () => {
    !showExpenseModal ? setShowExpenseModal(true) : null;
  };

  const handleCloseModal = () => {
    showExpenseModal ? setShowExpenseModal(false) : null;
  };

  return (
    <>
      <Banner
        title={"Nomech's Expense Tracker (NET)"}
        subtext={"It's tracking time!"}
      />
      <TotalExpenseCard data={dbData} />
      <ExpenseList data={dbData} handleOpenModal={handleOpenModal} />
      {showExpenseModal && <FormModal handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default App;
