// frontend/src/components/Homepage/SeeMoreEvents.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

const SeeMoreEvents = () => {

  return (
    <div className={`${styles.explore} ${styles.buttonContainer}`}>
      <img className={styles.joinGroupsImage} src='assets/starting-soon.jpg' alt='join groups'/>
      <h4>See more events starting soon</h4>
      <Link className={styles.button} to="/discover/events">See More</Link>
    </div>

  );
};

export default SeeMoreEvents;
