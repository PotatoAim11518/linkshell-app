// frontend/src/components/Homepage/GroupDiscovery.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';

const GroupDiscovery = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <h1 className={styles.sectionTitle}>Scheduled events from your groups</h1>
        <div className={styles.section}>
          <div className={styles.image}>
            <p>--Placeholder for events from your group--</p>
          </div>
          <div className={`${styles.explore} ${styles.buttonContainer}`}>
            <h4>Join more groups to see more events.</h4>
            <Link className={styles.button} to='/discover/groups'>Join more groups</Link>
          </div>
        </div>
    </>
  );
}

export default GroupDiscovery;
