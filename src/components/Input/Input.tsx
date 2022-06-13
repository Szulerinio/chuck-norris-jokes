import styles from "./Input.module.css";

const Input = ({
  value,
  label,
  onChange,
}: {
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <label className={styles.container}>
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
