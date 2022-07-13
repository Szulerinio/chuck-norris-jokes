import styles from "./CheckboxImage.module.css";
const CheckboxImage = ({ checked }: { checked: boolean }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 0C4.47715 0 0 4.47715 0 10V40C0 45.5228 4.47715 50 10 50H40C45.5228 50 50 45.5228 50 40V10C50 4.47715 45.5228 0 40 0H10ZM9.49635 28.606L17.9886 34.8829C18.8381 35.5108 20.0294 35.3698 20.7088 34.5609L39.2007 12.5468C39.9162 11.695 41.1892 11.5907 42.0337 12.3146L42.4947 12.7097C43.3282 13.4241 43.43 14.6768 42.7229 15.5165L21.2306 41.0387C20.542 41.8564 19.3322 41.988 18.4839 41.3376L6.67623 32.2851C5.76564 31.587 5.62786 30.2675 6.37458 29.3963L6.78906 28.9128C7.47151 28.1166 8.65305 27.9827 9.49635 28.606Z"
        className={
          checked
            ? styles.checkmarkBackgroundChecked
            : styles.checkmarkBackgroundUnchecked
        }
      />
      <rect
        x="2.5"
        y="2.5"
        width="45"
        height="45"
        rx="7.5"
        strokeWidth={5}
        className={checked ? styles.squareChecked : styles.squareUnchecked}
      />
      <path
        d="M17.9886 34.8829L9.49635 28.606C8.65305 27.9827 7.47151 28.1166 6.78906 28.9128L6.37458 29.3963C5.62786 30.2675 5.76564 31.587 6.67623 32.2851L18.4839 41.3376C19.3322 41.988 20.542 41.8564 21.2306 41.0387L42.7229 15.5165C43.43 14.6768 43.3282 13.4241 42.4947 12.7097L42.0337 12.3146C41.1892 11.5907 39.9162 11.695 39.2007 12.5468L20.7088 34.5609C20.0294 35.3698 18.8381 35.5108 17.9886 34.8829Z"
        className={
          checked ? styles.checkmarkChecked : styles.checkmarkUnchecked
        }
      />
    </svg>
  );
};

export default CheckboxImage;
