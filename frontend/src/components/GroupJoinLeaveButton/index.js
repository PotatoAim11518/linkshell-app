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
    userGroups.forEach((userGroup) => {
      if (userGroup?.groupId === group?.id && userGroup?.userId === user?.id) {
        setIsMember(true)
        return
      }
      setIsMember(false)
    });
  }, [dispatch, userGroups, group?.id, user?.id]);

  const join = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    dispatch(joinUserGroup(user?.id, group?.id))
  };

  const leave = (e) => {
    e.preventDefault();

    dispatch(leaveUserGroup(user?.id, group?.id))
  };


  return (
    <>
      {isMember && (
        <button className={`${styles.button} ${styles.leave}`} onClick={leave}>
          Leave
        </button>
      )}
      {!isMember && (
        <button className={`${styles.button} ${styles.join}`} onClick={join}>
          Join
        </button>
      )}
    </>
  );
}
