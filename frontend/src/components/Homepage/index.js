// frontend/src/components/Homepage/index.js
import React from "react";
import { useSelector } from "react-redux";
import GroupDiscovery from './GroupDiscovery'
import EventDiscovery from './EventDiscovery'
import UpcomingEvents from './UpcomingEvents'
import styles from './Homepage.module.css';

const Homepage = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)
  if (!sessionUser) {
    return <h1>Not Logged In User Page</h1>;
  } else {
    return (
      <>
        <div className={styles.pageContainer}>
          <EventDiscovery />
          <GroupDiscovery />
          <UpcomingEvents />
        </div>
      </>
    );
  }
};

export default Homepage;
