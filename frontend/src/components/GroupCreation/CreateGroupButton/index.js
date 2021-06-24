import React from "react";
import { Link } from "react-router-dom";
import styles from './CreateGroupButton.module.css'

export default function CreateGroupButton() {

  return (
    <>
      <div className={styles.buttonContainer}>
        <Link className={styles.button} to='/groups/create'>Create a group</Link>
      </div>
    </>
  )
}
