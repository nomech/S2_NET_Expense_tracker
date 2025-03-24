import "./App.css";
import Banner from "./components/Banner/Banner";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import TotalExpenseCard from "./components/totalExpenseCard/totalExpenseCard";
import Modal from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [dbData, setDbData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [isAdding]);

  const fetchdata = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const expenseCollection = collection(db, "expenses");
      const querySnapshot = await getDocs(expenseCollection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDbData(data);
    } catch (error) {
      console.error("Error fetching data from database", error);
    }
  };

  const handleOpenModal = () => {
    !showModal ? setShowModal(true) : null;
  };

  const handleCloseModal = () => {
    showModal ? setShowModal(false) : null;
  };

  return (
    <>
      <Banner
        title={"Nomech's Expense Tracker (NET)"}
        subtext={"It's tracking time!"}
      />
      <TotalExpenseCard data={dbData} />
      {dbData && (
        <ExpenseList data={dbData} handleOpenModal={handleOpenModal} />
      )}
      {showModal && <Modal handleCloseModal={handleCloseModal} setIsAdding={setIsAdding} />}
    </>
  );
}

export default App;
