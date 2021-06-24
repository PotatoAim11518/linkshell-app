import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroup, deleteGroup } from '../../../store/groups';
import styles from './DeleteGroup.module.css';


const DeleteGroup = ({group}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert("Let's not get too hasty...")
    // let removedGroup = await dispatch(deleteGroup(group.id))
    // if (removedGroup) {
    //   dispatch(getGroup(group.id))
    //   history.push(`/discover/groups`)
    // }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/groups/${group.id}`);
  }

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
