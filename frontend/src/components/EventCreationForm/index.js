import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroup, getGroups, createGroup } from '../../store/groups';
import { getLocations } from "../../store/locations";
import DateRangePickerComponent from '../DatePicker';
import 'react-nice-dates/build/style.css'
import styles from './CreateEvent.module.css';


const CreateEventForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [newName, setNewName ] = useState("");
  const [newAbout, setNewAbout ] = useState("");
  const [newLocationId, setNewLocationId ] = useState(1);

  const locations = useSelector((state) => (Object.values(state.locations)));
  const user = useSelector((state) => (state.session.user));

  const updateName = (e) => setNewName(e.target.value);
  const updateAbout = (e) => setNewAbout(e.target.value);
  const updateLocation = (e) => setNewLocationId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      history.push(`/login`)
    } else {
      const payload = {
        name: newName,
        about: newAbout,
        locationId: newLocationId,
        ownerId: user.id
      }
      let newGroup = await dispatch(createGroup(payload))
      if (newGroup) {
        dispatch(getGroup(newGroup.id))
        dispatch(getGroups())
        history.push(`/groups/${newGroup.id}`)
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
        {/* <input type="hidden" name="hostId" value={hostId}/>
        <input type="hidden" name="hostId" value={groupId}/> */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.valueContainers}>
            <input className={styles.input}
              type="text"
              placeholder="New Event name"
              required
              value={newName}
              onChange={updateName}
            />
          </div>
          <div className={styles.valueContainers}>
            <DateRangePickerComponent/>
          </div>
          <div className={styles.valueContainers}>
            {/* <input type="number" min="0" max="9999"/> */}
          </div>
          <div className={styles.valueContainers}>
            <textarea className={styles.textarea}
              rows="10"
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
            <select className={styles.select} onChange={updateLocation} defaultValue={newLocationId}>
              {locations && locations.map((location) => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
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
