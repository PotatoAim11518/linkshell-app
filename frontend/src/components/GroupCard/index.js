// frontend/src/components/GroupCard/index.js
import React from "react";
import styles from './GroupCard.module.css';

const GroupCard = ({group}) => {
  const { name, about, Type, User } = group;
  return (
    <div className={styles.groupCard}>
      <div>
        Image Placeholder
      </div>
      <h2>{name}</h2>
      <p>{Type.name}</p>
      <p>{User.username}</p>
      <p>{about}</p>
    </div>
  )
}

export default GroupCard;
