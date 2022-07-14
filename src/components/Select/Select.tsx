import styles from "./Select.module.css";
import { useEffect, useRef, useState } from "react";
import CheckboxImage from "../../assets/icons/CheckboxImage/CheckboxImage";

const Select = ({
  value,
  options,
  name,
  nameOnAction,
  onChange,
  style,
}: {
  value: string[];
  options: string[];
  name: string;
  nameOnAction: string;
  onChange: (value?: string) => void;
  style?: {};
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleChange = (value?: string) => {
    toggleIsExpanded();
    onChange(value);
  };

  const toggleIsExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  let selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (!selectRef.current?.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const optionItems = options.map((item) => (
    <label key={item}>
      <input
        className={styles.radio}
        type="checkbox"
        onChange={() => onChange(item)}
        value={item}
        name={name}
      />
      <span
        className={`${styles.option} ${styles.select} ${
          value.includes(item) ? styles.optionSelected : ""
        }`}
      >
        {<CheckboxImage checked={value.includes(item)}></CheckboxImage>}
        {item}
      </span>
    </label>
  ));

  const closedSelect = (
    <div
      className={`${styles.closed} ${styles.select} ${
        value.length > 0 ? styles.dark : ""
      }`}
      onClick={(event) => {
        toggleIsExpanded();
      }}
    >
      {value.length === 0 ? name : value.join(", ")}
    </div>
  );

  const picker = (
    <div className={`${styles.dropdown} ${isExpanded ? styles.open : ""}`}>
      <div
        className={`${styles.cancelButton} ${styles.select}`}
        onClick={() => {
          handleChange("");
        }}
      >
        {nameOnAction}
      </div>
      {optionItems}
    </div>
  );

  return (
    <div
      ref={selectRef}
      data-isexpanded={isExpanded}
      className={styles.container}
      style={style}
    >
      {closedSelect}
      {picker}
    </div>
  );
};
export default Select;
