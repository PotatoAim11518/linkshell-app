// frontend/src/components/GroupsList/index.js
import React, { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupEvents } from '../../../store/events';
// import { getTypes } from "../../store/types";
import styles from '../../EventCard/EventCard.module.css';
import EventCard from "../../EventCard";

export default function GroupEventsList({group}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupEvents(group?.id));
  }, [dispatch, group]);

  const events = useSelector((state) => Object.values(state.events));
  console.log(events)
  return (
    <div className={styles.eventsList}>
      <p>Hello</p>
      <div className={styles.header}></div>
      {events.map((event) => {
        if (event.group.id === group?.id) {
          return <EventCard key={event.id} event={event}/>
        }
      })}
    </div>
  )
}
