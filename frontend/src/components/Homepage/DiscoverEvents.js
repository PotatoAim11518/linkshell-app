// frontend/src/components/Homepage/DiscoverEvents.js
import React from "react";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';

const DiscoverEvents = () => {

  return (
    <div className={`${styles.explore} ${styles.yourNextEvent}`}>
      <Link className={styles.button} to='/discover/events'>Discover Events</Link>
    </div>
  );
}

export default DiscoverEvents;
