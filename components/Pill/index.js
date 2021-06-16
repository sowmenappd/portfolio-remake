import styles from "./index.module.css";

const Pill = ({
  title,
  backgroundColor = "white",
  color = "black",
  onPress,
  noPadding,
}) => {
  return (
    <div
      className={noPadding ? "" : styles.categoryBtnContainer}
      onClick={onPress}
    >
      <div
        className={styles.categoryBtnBody}
        style={{ backgroundColor, color }}
      >
        {title}
      </div>
    </div>
  );
};

export default Pill;
