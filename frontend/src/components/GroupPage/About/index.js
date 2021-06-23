import React from "react";
import { useSelector } from "react-redux";
import styles from '../GroupPage.module.css';

export default function About({group}) {

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <h3 className={styles.aboutHeader}>What we're about</h3>
      <p className={styles.aboutText}>{group.about}</p>
    </>
  )
}
