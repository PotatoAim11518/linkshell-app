// frontend/src/components/GroupsList/index.js
import React, { useEffect, }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from '../../store/groups';
import { getTypes } from "../../store/types";
import styles from './GroupsList.module.css';
import GroupCard from "../GroupCard";

const GroupsList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => Object.values(state.groups));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGroups());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={styles.groupsList}>
      <div className={styles.header}></div>
      {groups.map((group) => <GroupCard key={group.id} group={group}/>)}
    </div>
  )
}

export default GroupsList;
