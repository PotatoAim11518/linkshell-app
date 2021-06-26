// frontend/src/components/GroupPage/index.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, NavLink, Switch, Route } from "react-router-dom";
import { getGroups, updateGroup, getGroup } from '../../store/groups';
import { getGroupEvents } from '../../store/events';
import { getTypes } from '../../store/types';
import { getLocations } from '../../store/locations';
import styles from './GroupPage.module.css';
import About from "./About";
import GroupEventsList from "./Events";
import Members from "./Members";
import EditGroupForm from './EditGroup';
import DeleteGroup from './DeleteGroup';
import CreateEventForm from '../EventCreationForm';

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const groups = useSelector((state) => state?.groups);
  const types = useSelector((state) => state.types);
  const user = useSelector((state) => state.session.user);

  const group = groups[id]

  useEffect(() => {
    dispatch(getGroups())
    dispatch(getTypes())
    // dispatch(getGroupEvents(group?.id))
  },[dispatch])


  return (
    <>
      <div className={styles.pageContainer}>
        <h2 className={styles.groupName}>{group?.name}</h2>
        <div className={styles.divider}></div>
        <h3 className={styles.groupOwner}><em>Organized by </em> {group?.User?.username}</h3>
        <div className={styles.image}>
          <p>Placeholder for Image</p>
        </div>
      </div>
      <div className={styles.groupContent}>
        <nav className={styles.nav}>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive}
            exact to={`/groups/${id}`}>About
          </NavLink>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive}
            to={`/groups/${id}/events`}>Events
          </NavLink>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive}
            to={`/groups/${id}/members`}>Members
          </NavLink>
          {(user?.username === group?.User?.username) && (
            <>
              <NavLink className={`${styles.editBtn} ${styles.navLink}`} activeClassName={styles.navLinkActive}
              to={`/groups/${id}/edit`}>Edit Group
              </NavLink>
              <NavLink className={`${styles.deleteBtn} ${styles.navLink}`} activeClassName={styles.navLinkActive}
              to={`/groups/${id}/delete`}>Delete Group
              </NavLink>
            </>
          )}
          <div className={styles.groupType}>
            {group?.Type?.name}
          </div>
        </nav>
        <div className={styles.info}>
          <Switch>
            <Route exact path={`/groups/${id}`}>
              <About group={group}/>
            </Route>
            <Route path={`/groups/${id}/events`}>
              <CreateEventForm group={group}/>
              <GroupEventsList group={group}/>
            </Route>
            <Route path={`/groups/${id}/members`}>
              <Members group={group}/>
            </Route>
            <Route path={`/groups/${id}/edit`}>
              <EditGroupForm group={group}/>
            </Route>
            <Route path={`/groups/${id}/delete`}>
              <DeleteGroup group={group}/>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default GroupPage;
