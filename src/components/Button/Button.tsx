import styles from "./Button.module.css";
const Button = ({
  children,
  color,
  wide,
  onClick,
  style,
  className,
  disabled,
}: {
  children: string | JSX.Element;
  wide?: boolean;
  color: "dark" | "red" | "gray";
  onClick: () => void;
  style?: {};
  className?: string;
  disabled?: boolean;
}): JSX.Element => {
  const classes = `${styles.button} ${wide ? styles["button--wide"] : ""} ${
    disabled === true ? styles.disabled : ""
  } ${styles[`button--${color}`]} ${className}`;
  return (
    <button
      className={classes}
      onClick={() => {
        !disabled && onClick();
      }}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
