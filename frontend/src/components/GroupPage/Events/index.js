// frontend/src/components/GroupsList/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getGroupEvents } from "../../../store/events";
import styles from "./Events.module.css";
import EventCard from "../../EventCard";
import CreateEventButton from "../../EventCreationForm/CreateEventButton";

export default function GroupEventsList({ group, isMember }) {
  const dispatch = useDispatch();

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  useEffect(() => {
    dispatch(getGroupEvents(group?.id));
  }, [dispatch, group, isMember]);

  const events = useSelector((state) => Object.values(state.events));

  return (
    <div className={styles.eventsList}>
      <div className={styles.groupEventsHeader}>
        <h2 className={styles.headerText}>Upcoming Events</h2>
      </div>
      <div className={styles.creationButton}>
        <CreateEventButton
          group={group}
          isMember={isMember}
          showCreateEvent={showCreateEvent}
          setShowCreateEvent={setShowCreateEvent}
        />
      </div>
      {events.map((event) => {
        if (event?.group?.id === group?.id) {
          return <EventCard key={event?.id} event={event} />;
        }
      })}
      {events.filter((event) => event?.group?.id === group?.id).length ===
        0 && ( // this is the worst runtime. I'm so sorry.
        <p className={styles.noEventsText}>No upcoming events.</p>
      )}
    </div>
  );
}
