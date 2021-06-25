import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroup, updateGroup } from '../../../store/groups';
import { getTypes } from "../../../store/types";
import styles from './EditGroup.module.css';


const EditGroupForm = ({group}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [newName, setNewName ] = useState(group?.name);
  const [newAbout, setNewAbout ] = useState(group?.about);
  const [newTypeId, setNewTypeId ] = useState(group?.typeId);

  const types = useSelector((state) => Object.values(state.types));

  const updateName = (e) => setNewName(e.target.value);
  const updateAbout = (e) => setNewAbout(e.target.value);
  const updateType = (e) => setNewTypeId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...group,
      name: newName,
      about: newAbout,
      typeId: newTypeId
    }

    let updatedGroup = await dispatch(updateGroup(payload))
    if (updatedGroup) {
      dispatch(getGroup(group?.id))
      history.push(`/groups/${group?.id}`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/groups/${group?.id}`);
  }

  useEffect(() => {
    setNewName(group?.name)
    setNewTypeId(group?.typeId)
    setNewAbout(group?.about)
    dispatch(getTypes())
  },[dispatch, group])

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Make changes to your group</legend>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.valueContainers}>
          <input className={styles.input}
            type="text"
            placeholder="New group name"
            required
            value={newName}
            onChange={updateName}
          />
        </div>
        <div className={styles.valueContainers}>
          <select className={styles.select} onChange={updateType} defaultValue={group?.typeId}>
            {types && types.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.valueContainers}>
          <textarea className={styles.textarea}
            rows="10"
            cols="120"
            minlength="10"
            maxlength="2000"
            placeholder="Tell us about your group"
            required
            value={newAbout}
            onChange={updateAbout}>
          </textarea>
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.cancel}`} type="button" onClick={handleCancelClick}>Cancel</button>
          <button className={`${styles.button} ${styles.update}`} type="submit">Update</button>
        </div>
      </form>
    </fieldset>
  )
}

export default EditGroupForm;
