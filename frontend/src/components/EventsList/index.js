// frontend/src/components/GroupsList/index.js
import React, { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from '../../store/events';
// import { getTypes } from "../../store/types";
import styles from './EventsList.module.css';
import EventCard from "../EventCard";

const EventsList = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.events));

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className={styles.eventsList}>
      <div className={styles.header}></div>
      {events.map((event) => <EventCard key={event.id} event={event}/>)}
    </div>
  )
}

export default EventsList;
