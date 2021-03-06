import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { joinUserGroup, leaveUserGroup } from "../../store/userGroups";
import styles from "./GroupJoinLeaveButton.module.css";

export default function JoinLeaveButton({ group, isMember, setIsMember}) {
  const dispatch = useDispatch();
  const history = useHistory();

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
    return
  }, [dispatch, userGroups, group?.id, user?.id, setIsMember]);

  const join = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    dispatch(joinUserGroup(user?.id, group?.id))
  };

  const leave = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
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
