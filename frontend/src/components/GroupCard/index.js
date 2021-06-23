// frontend/src/components/GroupCard/index.js
import React from "react";
import styles from './GroupCard.module.css';
import { Link } from "react-router-dom";

const GroupCard = ({group}) => {
  const { id, name, about, Type, User } = group;
  return (
    <Link className={styles.link} to={`/groups/${id}`}>
      <div className={styles.groupCard}>
        <div className={styles.image}>
          Image Placeholder
          ImageId: {id}
        </div>
        <div className={styles.groupInfo}>
          <h2 className={styles.groupTitle}>{name}</h2>
          <div>
            <span>
              <p className={styles.typeName}>{Type.name}</p>
            </span>
            <span className={styles.divider}>
              <div className={styles.divider}></div>
            </span>
          </div>
          <p className={styles.about}>{about}</p>
          <p className={styles.owner}>Owner: {User.username}</p>
        </div>
      </div>
    </Link>
  )
}

export default GroupCard;
