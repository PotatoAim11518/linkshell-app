// frontend/src/components/EventPage/index.js
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, Switch, Route } from "react-router-dom";

import { getEvent, getGroupEvents } from "../../store/events";
import { getGroup } from "../../store/groups";
import { getRSVPs } from "../../store/rsvps";

import Details from "./Details";
import Attendees from "./Attendees";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import EventGroupCard from "./Group";
import RSVPInfo from "./RSVPInfo";
import RSVPButton from "../RSVPButton";

import styles from "./EventPage.module.css";

const EventPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const [isRSVPed, setIsRSVPed] = useState(false);

  const user = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events);
  const groups = useSelector((state) => state.groups);

  const event = events[eventId];
  const group = groups[event?.group?.id];

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getEvent(eventId));
    dispatch(getGroup(group?.id));
    dispatch(getGroupEvents(group?.id));
    dispatch(getRSVPs(user?.id))
  }, [dispatch, eventId, group?.id, user?.id, isRSVPed]);

  return (
    <>
      <Helmet>
        <title>{`${event?.group?.name} | ${event?.name}`}</title>
      </Helmet>
      <div className={styles.pageContainer}>
        <h2 className={styles.eventName}>{event?.name}</h2>
        <div className={styles.divider}></div>
        <h3 className={styles.eventHost}>
          <em>Organized by </em> {event?.host?.username}
        </h3>
        <div className={styles.image}>
          <p>Placeholder for Image</p>
        </div>
        <div className={styles.eventContent}>
          <nav className={styles.nav}>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              exact
              to={`/events/${eventId}`}
            >
              Details
            </NavLink>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.navLinkActive}
              to={`/events/${eventId}/attendees`}
            >
              Attendees
            </NavLink>
            {user?.username === event?.host?.username && (
              <>
                <NavLink
                  className={`${styles.editBtn} ${styles.navLink}`}
                  activeClassName={styles.navLinkActive}
                  to={`/events/${eventId}/edit`}
                >
                  Edit Event
                </NavLink>
                <NavLink
                  className={`${styles.deleteBtn} ${styles.navLink}`}
                  activeClassName={styles.navLinkActive}
                  to={`/events/${eventId}/delete`}
                >
                  Delete Event
                </NavLink>
              </>
            )}
            <RSVPButton event={event} isRSVPed={isRSVPed} setIsRSVPed={setIsRSVPed}/>
          </nav>
          <div className={styles.belowNav}>
            <div className={styles.info}>
              <Switch>
                <Route exact path={`/events/${eventId}`}>
                  <Details event={event} />
                </Route>
                <Route path={`/events/${eventId}/attendees`}>
                  <Attendees event={event} />
                </Route>
                <Route path={`/events/${eventId}/edit`}>
                  <EditEvent event={event} />
                </Route>
                <Route path={`/events/${eventId}/delete`}>
                  <DeleteEvent event={event} />
                </Route>
              </Switch>
            </div>
            <div className={styles.groupCard}>
              <EventGroupCard event={event} />
              <div className={styles.RSVPInfo}>
                <RSVPInfo event={event} />
              </div>
            </div>
            <div className={styles.widgetDivider}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
