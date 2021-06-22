// frontend/src/components/GroupPage/index.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from '../../store/groups';
import styles from './GroupsList.module.css';
import GroupCard from "../GroupCard";

const GroupPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groups));

  return (
    <div className={styles.groupsList}>
      <h2>Groups</h2>
      {groups.map((group) => <GroupCard key={group.id} group={group}/>)}
    </div>
  )
}

export default GroupsList;
