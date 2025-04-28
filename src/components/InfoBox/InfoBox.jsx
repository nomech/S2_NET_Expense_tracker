import styles from "./InfoBox.module.css";
import infoIcon from "../../assets/icons/infoIcon.svg";

const InfoBox = ({ text, label, action }) => {
  return (
    <div className={`${styles.default} ${styles[action]}`} aria-label={label}>
      <img src={infoIcon} alt=" Information icon" />
      <div className={styles.infoText}>{text}</div>
    </div>
  );
};

export default InfoBox;
