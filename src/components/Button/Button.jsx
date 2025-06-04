import React from 'react';
import styles from './Button.module.css';

// Reusable button component for actions
const Button = ({ children, handleAction, type = '', buttonType }) => {
	return (
		// Button element with dynamic styles and action handler
		<button
			className={`${styles.default} ${styles[type]}`}
			onClick={handleAction}
			type={buttonType}
		>
			{children}
		</button>
	);
};

export default Button;
