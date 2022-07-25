import styles from "./NumberPicker.module.scss";
import Button from "./../Button/Button";
import ButtonColors from "../Button/types";
const NumberPicker = ({
  value,
  onChange,
  onButtonClick,
  outOfRange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: (valueChange: number) => void;
  outOfRange: boolean;
}) => {
  return (
    <div
      className={`${styles.container} ${outOfRange ? styles.outOfRange : null}`}
    >
      <Button
        className={styles.signContainer}
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
        className={styles.signContainer}
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
        className={styles.circleBackground}
        cx="22.5"
        cy="22.5"
        r="22"
        fill="#D9D9D9"
        strokeWidth="0"
      />
      <circle
        className={styles.circleStroke}
        cx="22.5"
        cy="22.5"
        r="22"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M10 22H35"
        stroke="black"
        strokeWidth="2"
        className={styles.horizontalPath}
      />
      {sign === "plus" && (
        <path
          d="M22 35V10"
          stroke="black"
          strokeWidth="2"
          className={styles.verticalPath}
        />
      )}
    </svg>
  );
};
