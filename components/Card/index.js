import styles from "./index.module.css";

const Card = ({
  height,
  noPadding,
  padding = "4px",
  children,
  style,
  ...props
}) => {
  return (
    <div
      className={styles.container}
      style={{ height: height || "300px", ...style }}
    >
      {children}
    </div>
  );
};

export default Card;
