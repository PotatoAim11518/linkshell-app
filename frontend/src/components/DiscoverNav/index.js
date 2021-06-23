import React from "react";
import { NavLink } from "react-router-dom";
import styles from './DiscoverNav.module.css'

const DiscoverNav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink activeClassName={styles.navLinkActive} className={styles.navLink} to="/discover/groups">Groups</NavLink>
        <NavLink activeClassName={styles.navLinkActive} className={styles.navLink}  to="/discover/events">Events</NavLink>
      </nav>
    </>
  );
};

export default DiscoverNav;
