import React, { useEffect } from "react";
import styles from './Attendees.module.css';
import { getEvent } from '../../../store/events'

export default function Attendees({event}) {

  useEffect(() => {
    getEvent(event?.id)
  },[event])

  return (
    <>
      <h3 className={styles.attendeesHeader}>Here's who's going</h3>
      <p className={styles.attendeesText}>This place is scarcer than the Void!</p>
    </>
  )
}
