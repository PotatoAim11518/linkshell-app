// frontend/src/components/GroupPage/index.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGroup } from '../../store/groups';
import styles from './GroupsList.module.css';
import GroupCard from "../GroupCard";
import { useParams } from "react-router-dom";

const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups[id]);

  useEffect( ()=>{
    dispatch(updateGroup(group)); // this useEffect is very incomplete
  }, [dispatch, id])

  return (
    <div className={styles.groupsList}>
      <h2>Groups</h2>
      <GroupCard key={group.id} group={group}/>
    </div>
  )
}

export default GroupsList;
