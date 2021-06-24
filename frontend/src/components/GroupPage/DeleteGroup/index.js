import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroups, deleteGroup } from '../../../store/groups';
import styles from './DeleteGroup.module.css';


const DeleteGroup = ({group}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let removedGroup = await dispatch(deleteGroup(group.id))
    if (removedGroup) {
      dispatch(getGroups())
    }
    history.push(`/discover/groups`)
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.goBack();
  }

  useEffect(() => {
    dispatch(getGroups())
  },[dispatch])

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Permanently delete your group</legend>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>This will permanently delete your group!</h2>
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

export default DeleteGroup;
