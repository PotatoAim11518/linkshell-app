// frontend/src/components/Homepage/EventDiscovery.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';
import DiscoverEvents from "./DiscoverEvents";

const EventDiscovery = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <h1 className={styles.sectionTitle}>Your next event</h1>
        <div className={`${styles.section} ${styles.buttonContainer}`}>
          <div className={styles.image}>
            <p>--Placeholder your next event--</p>
          </div>
          <DiscoverEvents />
      </div>
    </>
  );
}

export default EventDiscovery;
