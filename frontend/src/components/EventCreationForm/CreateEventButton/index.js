import React from "react";
import { Link } from "react-router-dom";
import styles from './CreateEventButton.module.css'

export default function CreateEventButton() {

  return (
    <>
      <div className={styles.buttonContainer}>
        <Link className={styles.button} to='/events/create'>Create an event</Link>
      </div>
    </>
  )
}
