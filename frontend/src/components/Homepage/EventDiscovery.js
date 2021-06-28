// frontend/src/components/Homepage/EventDiscovery.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';
import DiscoverEvents from "./DiscoverEvents";

const EventDiscovery = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)
  const events = useSelector(state => state.events)
  const RSVPs = useSelector(state => Object.values(state.rsvps))

  // const dateObj = new Date(date);
  // const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  // const timeOptions = { timeStyle: 'short'}
  // const dateString = dateObj.toLocaleDateString("en-US", dateOptions);
  // const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);

  return (
    <>
      <h1 className={styles.sectionTitle}>Your next event</h1>
        <div className={`${styles.section} ${styles.buttonContainer}`}>
          <div className={styles.image}>
            <p>--Placeholder your next event--</p>
          </div>

          {/* <div className={styles.eventInfo}>
          <h2 className={styles.eventDateTime}>{dateString} <span style={{color: "red"}}> | </span> {timeString}</h2>
          <div>
            <span>
            <p className={styles.groupName}>{group?.name}</p>
            </span>
            <span className={styles.divider}>
              <div className={styles.divider}></div>
            </span>
          </div>
          <h2 className={styles.eventTitle}>{name}</h2>
          <p className={styles.host}><em>Hosted by</em> {'  '}{host?.username}</p>
          <div className={styles.bottomRow}>
            <p className={styles.location}>{location?.name}</p>
            <p className={styles.capacity}>{capacity} attendees</p>
          </div>
          </div> */}

          <DiscoverEvents />
      </div>
    </>
  );
}

export default EventDiscovery;
