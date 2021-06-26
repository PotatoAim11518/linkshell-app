import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'

import { createEvent, getEvent } from '../../store/events';
import { getLocations } from "../../store/locations";
import styles from './CreateEvent.module.css';
import './DateTimePicker.css';
import './Clock.css';
import './Calendar.css';

const CreateEventForm = ({group}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [newName, setNewName ] = useState("");
  const [newDate, setNewDate ] = useState(new Date());
  const [newLocationId, setNewLocationId ] = useState(1);
  const [newCapacity, setNewCapacity ] = useState();
  const [newAbout, setNewAbout ] = useState("");

  const locations = useSelector((state) => (Object.values(state.locations)));
  const user = useSelector((state) => (state.session.user));

  const updateName = (e) => setNewName(e.target.value);
  const updateDate = (e) => setNewDate(e.target.value);
  const updateLocation = (e) => setNewLocationId(e.target.value);
  const updateAbout = (e) => setNewAbout(e.target.value);
  const updateCapacity = (e) => setNewCapacity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      history.push(`/login`)
    } else {
      const payload = {
        name: newName,
        date: newDate,
        capacity: newCapacity,
        about: newAbout,
        hostId: user.id,
        locationId: newLocationId,
        groupId: group?.id
      }
      let newEvent = await dispatch(createEvent(payload))
      if (newEvent) {
        dispatch(getEvent(newEvent.id));
        history.push(`/events/${newEvent.id}`);
      }
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.goBack()
  }

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <div className={styles.formContainer}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Create your event</legend>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.valueContainers}>
            <input className={`${styles.eventName} ${styles.input}`}
              type="text"
              placeholder="Name your event!"
              required
              value={newName}
              onChange={updateName}
            />
          </div>
          <div className={styles.valueContainers}>
            <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              locale="en-US"
              maxDetail="second"
              minDate={new Date()}
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={updateDate}
              openWidgetsOnFocus="true"
              required
              secondAriaLabel="Second"
              showLeadingZeros="true"
              value={newDate}
              yearAriaLabel="Year"
            />
          </div>
          <div className={styles.valueContainers}>
            <textarea className={styles.textarea}
              rows="6"
              cols="120"
              minlength="10"
              maxlength="2000"
              placeholder="Tell us about your event"
              required
              value={newAbout}
              onChange={updateAbout}>
            </textarea>
          </div>
          <div className={styles.valueContainers}>
            <input className={`${styles.capacity} ${styles.input}`} name="capacity" type="number" min="0" max="9999" onChange={updateCapacity} value={newCapacity} defaultValue={null} placeholder="Enter event capacity"/>
            <div className={styles.valueContainers}>
            <select className={styles.select} onChange={updateLocation} defaultValue={newLocationId}>
              {locations && locations.map((location) => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.cancel}`} type="button" onClick={handleCancelClick}>Cancel</button>
            <button className={`${styles.button} ${styles.update}`} type="submit">Create</button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default CreateEventForm;
