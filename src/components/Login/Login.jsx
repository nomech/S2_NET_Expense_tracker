import React, { useState } from 'react';
import styles from './Login.module.css';
import { auth } from '../../firebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import Button from '../Button/Button';

const Login = () => {
	// Login state
	const [loginData, setLoginData] = useState({ email: '', password: '' });
	const [loginError, setLoginError] = useState(null);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	// Signup state
	const [signupData, setSignupData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [signupError, setSignupError] = useState(null);
	const [isSigningUp, setIsSigningUp] = useState(false);

	const handleChange = (e, type) => {
		const { name, value } = e.target;
		if (type === 'login') {
			setLoginData((prev) => ({ ...prev, [name]: value }));
		} else {
			setSignupData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const { email, password } = loginData;

		try {
			setLoginError(null);
			setIsLoggingIn(true);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setLoginError(error?.message || 'Login failed');
		} finally {
			setIsLoggingIn(false);
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const { fullName, email, password, confirmPassword } = signupData;

		// Basic client-side validation
		if (!fullName.trim()) {
			setSignupError('Please enter your full name.');
			return;
		}
		if (password.length < 6) {
			setSignupError('Password must be at least 6 characters.');
			return;
		}
		if (password !== confirmPassword) {
			setSignupError('Passwords do not match.');
			return;
		}

		try {
			setSignupError(null);
			setIsSigningUp(true);

			const cred = await createUserWithEmailAndPassword(auth, email, password);

			// Set display name in Firebase Auth profile
			await updateProfile(cred.user, { displayName: fullName.trim() });
		} catch (error) {
			setSignupError(error?.message || 'Signup failed');
		} finally {
			setIsSigningUp(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.authCard}>
				<div className={styles.columns}>
					{/* Login Column */}
					<form className={styles.column} onSubmit={handleLogin}>
						<div className={styles.title}>Login</div>
						{loginError && <div className={styles.error}>{loginError}</div>}

						<input
							name="email"
							type="email"
							placeholder="Email"
							value={loginData.email}
							onChange={(e) => handleChange(e, 'login')}
							className={styles.input}
							autoComplete="email"
							required
						/>

						<input
							name="password"
							type="password"
							placeholder="Password"
							value={loginData.password}
							onChange={(e) => handleChange(e, 'login')}
							className={styles.input}
							autoComplete="current-password"
							required
						/>

						<Button className={'login'} type="submit">
							{isLoggingIn ? 'Logging in...' : 'Login'}
						</Button>
					</form>

					<div className={styles.divider} aria-hidden="true" />

					{/* Signup Column */}
					<form className={styles.column} onSubmit={handleSignup}>
						<div className={styles.title}>Sign up</div>
						{signupError && <div className={styles.error}>{signupError}</div>}

						<input
							name="fullName"
							type="text"
							placeholder="Full name"
							value={signupData.fullName}
							onChange={(e) => handleChange(e, 'signup')}
							className={styles.input}
							autoComplete="name"
							required
						/>

						<input
							name="email"
							type="email"
							placeholder="Email"
							value={signupData.email}
							onChange={(e) => handleChange(e, 'signup')}
							className={styles.input}
							autoComplete="email"
							required
						/>

						<input
							name="password"
							type="password"
							placeholder="Password"
							value={signupData.password}
							onChange={(e) => handleChange(e, 'signup')}
							className={styles.input}
							autoComplete="new-password"
							required
						/>

						<input
							name="confirmPassword"
							type="password"
							placeholder="Confirm password"
							value={signupData.confirmPassword}
							onChange={(e) => handleChange(e, 'signup')}
							className={styles.input}
							autoComplete="new-password"
							required
						/>

						<Button className={'signup'} type="submit">
							{isSigningUp ? 'Creating account...' : 'Sign up'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
