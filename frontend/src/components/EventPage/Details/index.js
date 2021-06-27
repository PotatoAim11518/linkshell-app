import React, { useEffect } from "react";
import styles from './Details.module.css';
import { getEvent } from '../../../store/events'

export default function Details({event}) {

  useEffect(() => {
    getEvent(event?.id)
  },[event])

  return (
    <>
      <h3 className={styles.detailsHeader}>Here's what's happening</h3>
      <p className={styles.detailsText}>{event?.about}</p>
    </>
  )
}
