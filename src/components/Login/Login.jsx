import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		// Destructure email and password from formData
		const { email, password } = formData;

		// Attempt to sign in with email and password
		try {
			setError(null);
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			// If an error occurs, format the error message and set it in state
			setError(error.code, setError);
		} finally {
			// Reset loading state regardless of success or failure
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<form className={styles.loginForm} onSubmit={onSubmit}>
				<div className={styles.title}>Login</div>
				{error && <div className={styles.error}>{error}</div>}
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={(e) => handleChange(e)}
					className={styles.input}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={formData.password}
					onChange={(e) => handleChange(e)}
					className={styles.input}
				/>
				<button type="submit" className={styles.button}>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
