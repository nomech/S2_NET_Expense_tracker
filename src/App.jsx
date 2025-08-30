//CSS
import './App.css';

//Components
import Banner from './components/Banner/Banner';
import ExpenseList from './components/ExpenseList/ExpenseList';
import FormModal from './components/FormModal/FormModal';
import StatsCards from './components/StatsCard/StatsCards';
import Login from './components/Login/Login';
import Button from './components/Button/Button';

// hooks, firebase, and react
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useAuth } from './context/authContext';

function App() {
	// State for controlling the visibility of the expense modal
	const [showExpenseModal, setShowExpenseModal] = useState(false);

	// State for storing all expense data from Firestore
	const [dbData, setDbData] = useState();

	// State for editing an expense
	const [editData, setEditData] = useState({
		title: '',
		amount: '',
		date: '',
		category: '',
	});

	// State to track if the form is in edit mode
	const [editMode, SetEditMode] = useState(false);

	const { user, isLoading, signOutUser } = useAuth();

	// Fetch expenses from Firestore
	useEffect(() => {
		// Do nothing until auth is resolved
		if (isLoading) return;

		// If signed out, clear data and don't subscribe
		if (!user) {
			setDbData(undefined);
			return;
		}

		// *** CHANGED: scope to /users/{uid}/expenses ***
		const expenseCollection = collection(db, 'users', user.uid, 'expenses');
		const q = query(expenseCollection, orderBy('createdAt'));

		// Listen for real-time updates from Firestore
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				snapshot.docChanges().map((change) => {
					return { changeType: change.type, id: change.doc.id };
				});

				const newData = snapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});

				setDbData(newData);
			},
			(err) => {
				console.error('expenses listener error', err);
			}
		);

		// Cleanup on user change or unmount
		return () => unsubscribe();
	}, [db, user, isLoading]);

	// Open the form modal for adding a new expense
	const handleOpenFormModal = () => {
		!showExpenseModal && setShowExpenseModal(true);
	};

	// Open the form modal for editing an existing expense
	const handleEditForm = (data) => {
		setEditData(data);
		SetEditMode(true);
		!showExpenseModal && setShowExpenseModal(true);
	};

	// Close the form modal and reset edit state if needed
	const handleCloseFormModal = () => {
		if (editMode) {
			setEditData({ title: '', amount: '', date: '', category: '' });
			SetEditMode(false);
		}
		showExpenseModal && setShowExpenseModal(false);
	};
	const handleOnClickLogout = () => {
		signOutUser();
	};

	return (
		<>
			{!user && !isLoading && <Login />}
			{isLoading && <p>Loading...</p>}

			{user && !isLoading && (
				<>
					<Banner
						title={"Nomech's Expense Tracker (NET)"}
						subtext={"It's tracking time!"}
					/>
					{/* Banner displays the app title and subtitle */}
					<main>
						{/* Show statistics if data is loaded */}
						{dbData && <StatsCards data={dbData} />}

						{/* Show the expense list if data is loaded */}
						{dbData && (
							<ExpenseList
								data={dbData}
								setData={setDbData}
								handleOpenFormModal={handleOpenFormModal}
								handleEditForm={handleEditForm}
								handleCloseModal={handleCloseFormModal}
							/>
						)}

						{/* Show the form modal for adding/editing expenses */}
						{showExpenseModal && (
							<FormModal
								handleCloseModal={handleCloseFormModal}
								editData={editData}
								editMode={editMode}
							/>
						)}
					</main>
					<Button handleAction={handleOnClickLogout}> Logout </Button>
				</>
			)}
		</>
	);
}

export default App;
