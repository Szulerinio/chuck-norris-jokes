import styles from "./Select.module.css";
import { useEffect, useRef, useState } from "react";

const Select = ({
  value,
  options,
  name,
  nameOnAction,
  onChange,
  style,
}: {
  value: string;
  options: string[];
  name: string;
  nameOnAction: string;
  onChange: (value: string) => void;
  style?: {};
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleChange = (value: string) => {
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
        type="radio"
        onChange={() => handleChange(item)}
        value={item}
        name={name}
      />
      <span className={`${styles.option} ${styles.select}`}>{item}</span>
    </label>
  ));

  const closedSelect = (
    <div
      className={`${styles.closed} ${styles.select} ${
        value !== "" ? styles.dark : ""
      }`}
      onClick={(event) => {
        toggleIsExpanded();
      }}
    >
      {value === "" ? name : value}
    </div>
  );

  const picker = (
    <div className={`${styles.open}`}>
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
      data-isExpanded={isExpanded}
      className={styles.container}
      style={style}
    >
      {closedSelect}
      {isExpanded && picker}
    </div>
  );
};
export default Select;
//TODO: add Arrow
