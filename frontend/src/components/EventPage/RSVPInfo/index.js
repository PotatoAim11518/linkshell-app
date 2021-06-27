import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getEvent } from "../../../store/events";
import styles from "./RSVPInfo.module.css";

const RSVPInfo = () => {
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const event = events[eventId];

  const date = new Date(event?.date);
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions = { timeStyle: "short" };
  const dateString = date.toLocaleDateString("en-US", dateOptions);
  const timeString = date.toLocaleTimeString("en-US", timeOptions);

  useEffect(() => {
    dispatch(getEvent(eventId));
  }, [dispatch, eventId]);

  return (
    <>
      <div className={styles.RSVPcontainer}>
        <div className={styles.date}>
          <i className="far fa-calendar"></i> <span> {dateString}</span>
        </div>
        <div className={styles.time}>
          <i className="far fa-clock"></i> <span> {timeString}</span>
        </div>
        <button>Attend</button>
      </div>
      <div className={styles.divider}></div>
    </>
  );
};

export default RSVPInfo;
