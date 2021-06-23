import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroup, updateGroup } from '../../../store/groups';


const EditGroupForm = ({group}) => {
  const { id, name, about, typeId } = group;
  const [newName, setNewName ] = useState(name);
  const [newAbout, setNewAbout ] = useState(about);
  const [newTypeId, setNewTypeId ] = useState(typeId);
  const dispatch = useDispatch();
  const history = useHistory();

  const updateName = (e) => setNewName(e.target.value);
  const updateAbout = (e) => setNewAbout(e.target.value);

  useEffect(() =>{
    // TO DO dispatch(getTypes())
    dispatch(getGroup(id))

  },[dispatch, id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...group,
      id: id,
      name: newName,
      about: newAbout,
      typeId: newTypeId
    }

    let updatedGroup = await dispatch(updateGroup(payload))
    if (updatedGroup) {
      history.push(`/groups/${id}`)
      return
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/groups/${id}`);
  }

  return (
    <fieldset>
      <legend>Make changes to your group</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="New group name"
            required
            value={newName}
            onChange={updateName}
          />
        </div>
        <div>
          <textarea
            placeholder="Tell us about your group"
            required
            value={newAbout}
            onChange={updateAbout}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </fieldset>
  )
}

export default EditGroupForm;
