// frontend/src/components/GroupPage/index.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, NavLink, Switch, Route } from "react-router-dom";
import { getGroups, updateGroup, getGroup } from '../../store/groups';
import styles from './GroupPage.module.css';
import About from "./About";
import EditGroupForm from './EditGroup';

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const group = useSelector((state) => state.groups[id]);
  const types = useSelector((state) => state.types);
  const user = useSelector((state) => state.session.user) || null;

  const ownerName = group.User.username;

  useEffect(() => {
    dispatch(getGroups())
  },[dispatch])


  return (
    <>
      <div className={styles.pageContainer}>
        <h2 className={styles.groupName}>{group.name}</h2>
        <div className={styles.divider}></div>
        <h3 className={styles.groupOwner}><em>Organized by </em> {group.User.username}</h3>
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
          {(user.username === ownerName) && (
            <NavLink className={`${styles.editBtn} ${styles.navLink}`} activeClassName={styles.navLinkActive}
            to={`/groups/${id}/edit`}>Edit Group
            </NavLink>
          )}
          <h3 className={styles.groupType}>{group.Type.name}</h3>
        </nav>
        <div className={styles.info}>
          <Switch>
            <Route exact path={`/groups/${id}`}>
              <About group={group}/>
            </Route>
            <Route path={`/groups/${id}/events`}>
              <p>Events Section</p>
            </Route>
            <Route path={`/groups/${id}/members`}>
              <p>Members Section</p>
            </Route>
            <Route path={`/groups/${id}/edit`}>
              <EditGroupForm group={group}/>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default GroupPage;
