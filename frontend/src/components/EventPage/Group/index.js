import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import styles from './Group.module.css';
import { getEvent } from '../../../store/events';

const EventGroupCard = () => {
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events)
  const event = events[eventId]

  useEffect(()=> {
    dispatch(getEvent(eventId))
  },[dispatch, eventId])

  return (
    <>
      <Link className={styles.link} to={`/groups/${event?.groupId}`}>
        <div className={styles.groupCard}>
          <div className={styles.groupInfo}>
            <h2 className={styles.groupTitle}>{event?.group?.name}</h2>
          </div>
          <div className={styles.image}>
            Image Placeholder
            ImageId: {event?.groupId}
          </div>
        </div>
      </Link>
    </>
  )
}

export default EventGroupCard;
