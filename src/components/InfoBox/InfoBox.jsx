import styles from './InfoBox.module.css';
import infoIcon from '../../assets/icons/infoIcon.svg';

// Displays an info icon and a tooltip with text
const InfoBox = ({ text, label }) => {
	return (
		<div className={`${styles.default}`} aria-label={label}>
			{/* Info icon */}
			<img src={infoIcon} alt=" Information icon" />

			{/* Tooltip text */}
			<div className={styles.infoText}>{text}</div>
		</div>
	);
};

export default InfoBox;
