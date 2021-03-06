// frontend/src/components/GroupCard/index.js
import React, {useState} from "react";
import styles from './EventCard.module.css';
import { Link } from "react-router-dom";
import RSVPButton from "../RSVPButton";

const EventCard = ({event}) => {
  const { id, name, date, capacity, host, location, group } = event;
  const dateObj = new Date(date);
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  const timeOptions = { timeStyle: 'short'}
  const dateString = dateObj.toLocaleDateString("en-US", dateOptions);
  const timeString = dateObj.toLocaleTimeString("en-US", timeOptions);

  // const [isRSVPed, setIsRSVPed] = useState();

  return (
    <Link className={styles.link} to={`/events/${id}`}>
      <div className={styles.eventCard}>
        <div className={styles.image}>
          Image Placeholder
          ImageId: {id}
        </div>
        <div className={styles.eventInfo}>
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
            {/* <RSVPButton event={event} isRSVPed={isRSVPed} setIsRSVPed={setIsRSVPed}/> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard;
