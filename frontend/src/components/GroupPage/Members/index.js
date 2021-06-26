import React, { useEffect } from "react";
import styles from './Members.module.css';
import { getGroup } from '../../../store/groups'

export default function Members({group}) {

  useEffect(() => {
    getGroup(group?.id)
  },[group])

  return (
    <>
      <h3 className={styles.membersHeader}>Members of {group?.name}</h3>
      <p className={styles.membersText}>This place is scarcer than the Void!</p>
    </>
  )
}
