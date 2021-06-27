import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEvents, getGroupEvents, deleteEvent } from '../../../store/events';
import styles from './DeleteEvent.module.css';


const DeleteEvent = ({event}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let deletedEvent = await dispatch(deleteEvent(event.id))
    if (deletedEvent) {
      // dispatch(getEvents()) let's see if we need this
    }
    history.push(`/groups/${event.group.id}`)
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.goBack();
  }

  useEffect(() => {
    dispatch(getGroupEvents())
  },[dispatch])

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Delete this event</legend>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>This will permanently delete this event!!</h2>
        <h2 style={{color: 'red'}}>THERE IS NO GOING BACK.</h2>
        <h2>ARE YOU SURE?</h2>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.cancel}`} type="button" onClick={handleCancelClick}>Cancel</button>
          <button className={`${styles.button} ${styles.delete}`} type="submit">DELETE</button>
        </div>
      </form>
    </fieldset>
  )
}

export default DeleteEvent;
