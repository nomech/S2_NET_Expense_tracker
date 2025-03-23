import "./App.css";
import Banner from "./components/Banner/Banner";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import TotalExpenseCard from "./components/totalExpenseCard/totalExpenseCard";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      id: 1,
      title: "Test data 1",
      amount: 10000,
      date: "2025-01-01",
      category: "housing",
    },
    {
      id: 2,
      title: "Test data 2",
      amount: 200,
      date: "2025-02-01",
      category: "utility",
    },
    {
      id: 3,
      title: "Test data 3",
      amount: 1200,
      date: "2025-03-02",
      category: "groceries",
    },
    {
      id: 4,
      title: "Test data 4",
      amount: 53,
      date: "2025-06-12",
      category: "transportation",
    },
    {
      id: 5,
      title: "Test data 5",
      amount: 125,
      date: "2025-12-01",
      category: "entertainment",
    },
  ];

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
      <TotalExpenseCard data={data} />
      <ExpenseList data={data} handleOpenModal={handleOpenModal} />
      {showModal && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default App;
