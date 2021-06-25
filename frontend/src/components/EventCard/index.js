// frontend/src/components/GroupCard/index.js
import React from "react";
import styles from './EventCard.module.css';
import { Link } from "react-router-dom";

const GroupCard = ({event}) => {
  const { id, name, date, capacity, host, location, group } = event;
  const dateObj = new Date(date);
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  const timeOptions = { timeZone: 'PST', timeZoneName: 'short' }
  const dateString = dateObj.toLocaleDateString("en-US", dateOptions);
  const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);

  return (
    <Link className={styles.link} to={`/events/${id}`}>
      <div className={styles.eventCard}>
        <div className={styles.image}>
          Image Placeholder
          ImageId: {id}
        </div>
        <div className={styles.eventInfo}>
          <div>
            <span>
              <h2 className={styles.eventDateTime}>{dateString} @ {timeString}</h2>
            </span>
            <span className={styles.divider}>
              <div className={styles.divider}></div>
            </span>
          </div>
          <h2 className={styles.eventTitle}>{name}</h2>
          <p className={styles.groupName}>{group.name}<span style={{color: "red"}}> | </span> Hosted by {host.username}</p>
          <p className={styles.location}>{location.name}</p>
          <p className={styles.capacity}>{capacity} attendees</p>
        </div>
      </div>
    </Link>
  )
}

export default GroupCard;
