import React, { useEffect } from "react";
import styles from './About.module.css';
import { getGroup } from '../../../store/groups'

export default function About({group}) {

  useEffect(() => {
    getGroup(group?.id)
  },[group])

  return (
    <>
      <h3 className={styles.aboutHeader}>What we're about</h3>
      <p className={styles.aboutText}>{group?.about}</p>
    </>
  )
}
