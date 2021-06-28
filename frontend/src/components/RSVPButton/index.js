import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addRSVP, removeRSVP } from "../../store/rsvps";
import styles from "./GroupJoinLeaveButton.module.css";

export default function RSVPButton({ event, isRSVPed, setIsRSVPed}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const RSVPs = useSelector((state) => Object.values(state.rsvps));

  useEffect(() => {
    RSVPs.forEach((RSVP) => {
      if (RSVP?.eventId === event?.id && RSVP?.userId === user?.id) {
        setIsRSVPed(true)
        return
      }
      setIsRSVPed(false)
    });
  }, [dispatch, RSVPs, event?.id, user?.id, isRSVPed, setIsRSVPed]);

  const add = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    dispatch(addRSVP(user?.id, event?.id))
  };

  const remove = (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
    }
    dispatch(removeRSVP(user?.id, event?.id))
  };


  return (
    <>
      {isRSVPed && (
        <button className={`${styles.button} ${styles.remove}`} onClick={remove}>
          Unattend
        </button>
      )}
      {!isRSVPed && (
        <button className={`${styles.button} ${styles.add}`} onClick={add}>
          Attend
        </button>
      )}
    </>
  );
}
