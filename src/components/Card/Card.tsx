import React from "react";
import styles from "./Card.module.css";
const Card = ({ children }: { children?: JSX.Element[] }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Card;
