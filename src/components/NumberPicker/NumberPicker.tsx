import styles from "./NumberPicker.module.css";
import Button from "./../Button/Button";
import ButtonColors from "../Button/types";
const NumberPicker = ({
  value,
  onChange,
  onButtonClick,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: (valueChange: number) => void;
}) => {
  return (
    <div className={styles.container}>
      <Button
        className={styles.sign_container}
        color={ButtonColors.Gray}
        onClick={() => {
          onButtonClick(-1);
        }}
      >
        {<SignButton sign="minus" />}
      </Button>
      <input
        type="number"
        name=""
        onChange={onChange}
        value={value}
        className={styles.input}
      />
      <Button
        className={styles.sign_container}
        color={ButtonColors.Gray}
        onClick={() => {
          onButtonClick(1);
        }}
      >
        {<SignButton sign="plus" />}
      </Button>
    </div>
  );
};
export default NumberPicker;

const SignButton = ({ sign }: { sign: string }) => {
  return (
    <svg
      className={styles.sign}
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="22"
        fill="#D9D9D9"
        stroke="black"
        strokeWidth="2"
      />
      <path d="M10 22H35" stroke="black" strokeWidth="2" />
      {sign === "plus" && <path d="M22 35V10" stroke="black" strokeWidth="2" />}
    </svg>
  );
};
