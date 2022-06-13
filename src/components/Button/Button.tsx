import styles from "./Button.module.css";
const Button = ({
  children,
  color,
  wide,
  onClick,
}: {
  children: string;
  wide?: boolean;
  color: "dark" | "red" | "gray";
  onClick: () => void;
}): JSX.Element => {
  const classes = `${styles.button} ${wide ? styles["button--wide"] : ""} ${
    styles[`button--${color}`]
  }`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
