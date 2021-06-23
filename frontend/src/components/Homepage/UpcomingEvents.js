// frontend/src/components/Homepage/UpcomingEvents.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import SeeMoreEvents from "./SeeMoreEvents";

const UpcomingEvents = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div>
        <h1 className={styles.sectionTitle}>Attend an event starting soon</h1>
        {/* <div>
          <Link to="/discover/events">More events starting soon</Link>
        </div> */}
      </div>
      <div className={styles.section}>
        <div className={styles.image}>
          <p>--Placeholder for events happening soon--</p>
        </div>
        <SeeMoreEvents />
      </div>
    </>
  );
};

export default UpcomingEvents;
