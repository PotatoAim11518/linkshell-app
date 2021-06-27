import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { joinUserGroup, leaveUserGroup, getUserGroups } from "../../store/userGroups";
import styles from "./GroupJoinLeaveButton.module.css";

export default function JoinLeaveButton({ group }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isMember, setIsMember] = useState(false);

  const user = useSelector((state) => state.session.user);
  const userGroups = useSelector((state) => Object.values(state.userGroups));

  useEffect(() => {
    dispatch(getUserGroups(user?.id))
    userGroups.forEach((userGroup) => {
      if (userGroup?.groupId === group?.id && userGroup?.userId === user?.id) {
        setIsMember(true)
        return
      }
    });
  }, [dispatch, userGroups, group?.id, user?.id]);

  const join = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    dispatch(joinUserGroup(user?.id, group?.id));
    window.alert("JOINED");
  };

  const leave = (e) => {
    e.preventDefault();

    // dispatch(leaveUserGroup(group?.id, user?.id));
  };


  return (
    <>
      {isMember && (
        <button className={`${styles.button} ${styles.update}`} onClick={leave}>
          Leave
        </button>
      )}
      {!isMember && (
        <button className={`${styles.button} ${styles.update}`} onClick={join}>
          Join
        </button>
      )}
    </>
  );
}
