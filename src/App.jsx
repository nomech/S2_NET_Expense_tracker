//CSS
import "./App.css";

//Components
import Banner from "./components/Banner/Banner";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import TotalExpenseCard from "./components/totalExpenseCard/totalExpenseCard";
import FormModal from "./components/FormModal/FormModal";

// hooks, firebase, and react
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

function App() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [dbData, setDbData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [isAdding, isDeleting]);

  const fetchData = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const expenseCollection = collection(db, "expenses");
      const querySnapshot = await getDocs(expenseCollection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setDbData(data);
    } catch (error) {
      console.error("Error fetching data from database", error);
    }
  };

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
      <ExpenseList
        data={dbData}
        handleOpenModal={handleOpenModal}
        setIsDeleting={setIsDeleting}
      />
      {showExpenseModal && (
        <FormModal
          handleCloseModal={handleCloseModal}
          setIsAdding={setIsAdding}
        />
      )}
    </>
  );
}

export default App;
