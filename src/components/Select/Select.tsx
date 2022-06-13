import styles from "./Select.module.css";
import { useEffect, useRef, useState } from "react";

const Select = ({
  value,
  options,
  name,
  nameOnAction,
  onChange,
}: {
  value: string;
  options: string[];
  name: string;
  nameOnAction: string;
  onChange: (value: string) => void;
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
      <span className={styles.option}>{item}</span>
    </label>
  ));
  return (
    <div
      ref={selectRef}
      className={`${styles.container} ${
        value !== "" && !isExpanded ? styles["container--dark"] : ""
      }`}
    >
      <div
        className={styles.current}
        onClick={(event) => {
          toggleIsExpanded();
          if (isExpanded) onChange("");
        }}
      >
        {isExpanded ? nameOnAction : value !== "" ? value : name}
      </div>
      {isExpanded && <div className={styles.options}>{optionItems}</div>}
    </div>
  );
};
export default Select;
//TODO: add Arrow
