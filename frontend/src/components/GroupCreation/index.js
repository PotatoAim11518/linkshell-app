import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroup, getGroups, createGroup } from '../../store/groups';
import { getTypes } from "../../store/types";
import styles from './CreateGroup.module.css';


const CreateGroupForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [newName, setNewName ] = useState("");
  const [newAbout, setNewAbout ] = useState("");
  const [newTypeId, setNewTypeId ] = useState(1);

  const types = useSelector((state) => Object.values(state.types));
  // const groups = useSelector((state) => (state.groups));
  const user = useSelector((state) => (state.session.user));

  const updateName = (e) => setNewName(e.target.value);
  const updateAbout = (e) => setNewAbout(e.target.value);
  const updateType = (e) => setNewTypeId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      history.push(`/login`)
    } else {
      const payload = {
        name: newName,
        about: newAbout,
        typeId: newTypeId,
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
    // (`/discover/groups`);
  }

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Create your group</legend>
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
          <select className={styles.select} onChange={updateType} defaultValue={newTypeId}>
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
          <button className={`${styles.button} ${styles.update}`} type="submit">Create</button>
        </div>
      </form>
    </fieldset>
  )
}

export default CreateGroupForm;
