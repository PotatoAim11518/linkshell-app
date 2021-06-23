// frontend/src/components/GroupCard/index.js
import React from "react";
import styles from './GroupCard.module.css';

const GroupCard = ({group}) => {
  const { id, name, about, Type, User } = group;
  return (
    <a className={styles.a} href={`/groups/${id}`}>
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
    </a>
  )
}

export default GroupCard;
