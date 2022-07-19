import styles from "./Button.module.scss";
import ButtonColors from "./types";
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
  color: ButtonColors;
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
