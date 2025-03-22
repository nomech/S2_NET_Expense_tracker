import Banner from "./components/Banner/Banner";
import ExpenseList from "./components/ExpenseList/ExpenseList";

function App() {
  const data = [
    {
      id: 1,
      title: "Test data 1",
      amount: 100,
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
  ];

  console.log(data.map((item) => Object.keys(item)));

  return (
    <>
      <Banner
        title={"Nomech's Expense tracker"}
        subtext={"It's tracking time!"}
      />

      <ExpenseList data={data} />
    </>
  );
}

export default App;
