// frontend/src/components/Homepage/JoinGroups.js
import React from "react";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';

const JoinGroups = () => {

  return (
    <div className={`${styles.explore} ${styles.buttonContainer}`}>
      <h4>Join more groups to see more events.</h4>
      <Link className={styles.button} to='/discover/groups'>Join more groups</Link>
    </div>
  );
}

export default JoinGroups;
