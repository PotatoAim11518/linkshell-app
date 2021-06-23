// frontend/src/components/GroupPage/index.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups, updateGroup, getGroup } from '../../store/groups';
import styles from './GroupPage.module.css';
import { useParams, NavLink, Switch, Route } from "react-router-dom";

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups[id]);

  useEffect(()=>{
    dispatch(getGroup(id))
  },[dispatch, id])

  return (
    <>
      <div className={styles.pageContainer}>
        <h2>{group.name}</h2>
        <div className={styles.divider}></div>
        <h3><em>Organized by </em> {group.User.username}</h3>
        <div className={styles.image}>
          <p>Placeholder for Image</p>
        </div>
      </div>
      <div className={styles.groupContent}>
        <nav className={styles.nav}>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive} exact to={`/groups/${id}`}>About</NavLink>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive} to={`/groups/${id}/events`}>Events</NavLink>
          <NavLink className={styles.navLink} activeClassName={styles.navLinkActive} to={`/groups/${id}/members`}>Members</NavLink>
        </nav>
        <div className={styles.info}>
          <Switch>
            <Route exact path={`/groups/${id}`}>
              <p>About Section</p>
            </Route>
            <Route exact path={`/groups/${id}/events`}>
              <p>Events Section</p>
            </Route>
            <Route path={`/groups/${id}/members`}>
              <p>Members Section</p>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default GroupPage;
