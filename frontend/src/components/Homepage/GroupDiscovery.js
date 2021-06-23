// frontend/src/components/Homepage/GroupDiscovery.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Homepage.module.css';
import JoinGroups from "./JoinGroups";

const GroupDiscovery = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <h1 className={styles.sectionTitle}>Scheduled events from your groups</h1>
        <div className={styles.section}>
          <div className={styles.image}>
            <p>--Placeholder for events from your group--</p>
          </div>
          <JoinGroups />
        </div>
    </>
  );
}

export default GroupDiscovery;
