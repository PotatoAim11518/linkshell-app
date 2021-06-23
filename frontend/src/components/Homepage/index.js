// frontend/src/components/Homepage/index.js
import React from "react";
import { useSelector } from "react-redux";
import GroupDiscovery from './GroupDiscovery'
import EventDiscovery from './EventDiscovery'
import UpcomingEvents from './UpcomingEvents'
import DiscoverEvents from "./DiscoverEvents";
import JoinGroups from "./JoinGroups";
import SeeMoreEvents from "./SeeMoreEvents";
import styles from './Homepage.module.css';

const Homepage = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)
  if (!sessionUser) {

    return (
      <>
        <h1>How Linkshell Works</h1>
        <p>Meet new FFXIV players who share your interests, party up, and bring peace, art, fashion, and more to Eorzea!</p>
        <DiscoverEvents />
        <div className={styles.loggedOutPage}>
          <JoinGroups />
          <SeeMoreEvents />
        </div>
      </>
    )
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
