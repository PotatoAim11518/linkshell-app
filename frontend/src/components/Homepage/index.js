// frontend/src/components/Homepage/index.js
import React from "react";
import { useSelector } from "react-redux";
import GroupDiscovery from "./GroupDiscovery";
import EventDiscovery from "./EventDiscovery";
import UpcomingEvents from "./UpcomingEvents";
import DiscoverEvents from "./DiscoverEvents";
import JoinGroups from "./JoinGroups";
import SeeMoreEvents from "./SeeMoreEvents";
import styles from "./Homepage.module.css";

const Homepage = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    return (
      <>
        <div className={styles.gradientWrapper}>
          <img className={styles.welcomeImage} src="assets/homepage/main_banner.jpg" alt="main page banner" />
        </div>
        <div className={styles.welcomeContainer}>
          <h1 className={styles.welcomeTitle}>How Linkshell Works</h1>
          <p className={styles.welcomeText}>
          Meet new FFXIV players who share your interests, party up, and bring
          peace, art, fashion, and more to Eorzea!
          </p>
        </div>
        <div className={styles.loggedOutPage}>
          <JoinGroups />
          <div className={`${styles.explore} ${styles.buttonContainer} ${styles.discover}`}>
            <img className={styles.discoverImage} src='assets/aetheryte.png' alt='aetheryte'/>
            <h4>Discover something new happening in Eorzea!.</h4>
            <DiscoverEvents />
          </div>
          <SeeMoreEvents />
        </div>
      </>
    );
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
