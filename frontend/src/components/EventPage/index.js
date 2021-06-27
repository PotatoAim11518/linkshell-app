// frontend/src/components/EventPage/index.js
import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, Switch, Route } from "react-router-dom";

import { getEvent, getGroupEvents } from '../../store/events';
import { getGroup } from '../../store/groups';

import styles from './EventPage.module.css';
import GroupCard from '../GroupCard';
import Details from "./Details";
import Attendees from "./Attendees";
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';

const EventPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const groups = useSelector((state) => state.groups);
  const events = useSelector((state) => state.events);
  const types = useSelector((state) => state.types);

  const event = events[eventId]
  const group = groups[event?.group?.id]

  useEffect(() => {
    dispatch(getEvent(eventId))
    dispatch(getGroup(group?.id))
    // dispatch(getTypes())
    dispatch(getGroupEvents(group?.id))
  },[dispatch, eventId])


  return (
    <>
      <Helmet><title>{`${group?.name} | ${event?.name}`}</title></Helmet>
      <div className={styles.pageContainer}>
        <h2 className={styles.eventName}>{event?.name}</h2>
        <div className={styles.divider}></div>
        <h3 className={styles.eventHost}><em>Organized by </em> {event?.host?.username}</h3>
        <div className={styles.image}>
          <p>Placeholder for Image</p>
        </div>
      </div>
      <div className={styles.eventContent}>
        <nav className={styles.nav}>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive}
            exact to={`/events/${eventId}`}>Details
          </NavLink>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive}
            to={`/events/${eventId}/attendees`}>Attendees
          </NavLink>
          {(user?.username === event?.host?.username) && (
            <>
              <NavLink className={`${styles.editBtn} ${styles.navLink}`} activeClassName={styles.navLinkActive}
              to={`/events/${eventId}/edit`}>Edit Event
              </NavLink>
              <NavLink className={`${styles.deleteBtn} ${styles.navLink}`} activeClassName={styles.navLinkActive}
              to={`/events/${eventId}/delete`}>Delete Event
              </NavLink>
            </>
          )}
          <div className={styles.groupCard}>
            <h2>Group Card Placeholder</h2>
            {/* <GroupCard group={group}/> */}
          </div>
        </nav>
        <div className={styles.info}>
          <Switch>
            <Route exact path={`/events/${eventId}`}>
              <Details event={event}/>
            </Route>
            <Route path={`/events/${eventId}/attendees`}>
              <Attendees event={event}/>
            </Route>
            <Route path={`/events/${eventId}/edit`}>
              <EditEvent event={event}/>
            </Route>
            <Route path={`/events/${eventId}/delete`}>
              <DeleteEvent event={event}/>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default EventPage;