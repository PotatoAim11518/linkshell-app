// frontend/src/components/GroupCard/index.js
import React from "react";
import styles from './GroupCard.module.css';

const GroupCard = ({group}) => {
  const { name, about, typeId, ownerId } = group;
  return (
    <div className={styles.groupCard}>
      <div>
        Image Placeholder
      </div>
      <h2>{name}</h2>
      <p>{about}</p>
    </div>
  )
}

export default GroupCard;
