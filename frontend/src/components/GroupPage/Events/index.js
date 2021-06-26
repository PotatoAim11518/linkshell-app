// frontend/src/components/GroupsList/index.js
import React, { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupEvents } from '../../../store/events';
// import { getTypes } from "../../store/types";
// import styles from '../../EventCard/EventCard.module.css';
import styles from './Events.module.css';
import EventCard from "../../EventCard";
import CreateEventButton from "../../EventCreationForm/CreateEventButton";

export default function GroupEventsList({group}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupEvents(group?.id));
  }, [dispatch, group]);

  const events = useSelector((state) => Object.values(state.events));

  return (
    <div className={styles.eventsList}>
      <div className={styles.groupEventsHeader}>
        <h2 className={styles.headerText}>Upcoming Events</h2>
        <div className={styles.creationButton}><CreateEventButton /></div>
      </div>
      {/* <Route path='/events/create' */}
      {events.map((event) => {
        if (event.group.id === group?.id) {
          return <EventCard key={event.id} event={event}/>
        }
      })}
      { (events.filter((event)=> event.group.id === group?.id).length === 0) // this is the worst runtime. I'm so sorry.
      &&
      <p className={styles.noEventsText}>No upcoming events.</p>}
    </div>
  )
}
