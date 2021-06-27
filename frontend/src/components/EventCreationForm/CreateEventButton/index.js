import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./CreateEventButton.module.css";
import CreateEventForm from "../../EventCreationForm";

export default function CreateEventButton({
  group,
  isMember,
  showCreateEvent,
  setShowCreateEvent,
}) {

  const eventFormTrigger = () => {
    if (!isMember) {
      window.alert("Please join the group to make events!");
    } else {
      if (!showCreateEvent) {
        setShowCreateEvent(true);
      } else {
        setShowCreateEvent(false);
      }
    }
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={eventFormTrigger}>
          Create an event
        </button>
        {showCreateEvent && <CreateEventForm group={group}/>}
      </div>
    </>
  );
}
