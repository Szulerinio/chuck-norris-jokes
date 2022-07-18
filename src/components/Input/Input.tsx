import styles from "./Input.module.scss";

const Input = ({
  value,
  label,
  onChange,
  style,
}: {
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: {};
}): JSX.Element => {
  return (
    <label className={styles.container} style={style}>
      <input
        type="text"
        placeholder=" "
        value={value}
        className={styles.input}
        onChange={onChange}
      />
      <span className={styles.label}> {label}</span>
    </label>
  );
};

export default Input;
