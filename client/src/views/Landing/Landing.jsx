import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.h1}>DOGS</h1>
        <Link to="/home">
          <button className={styles.button}>START</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
