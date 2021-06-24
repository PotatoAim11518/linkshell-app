import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getGroup, updateGroup } from '../../../store/groups';


const EditGroupForm = ({group}) => {

  const dispatch = useDispatch();

  console.log('===========GROUP: ', group)

  const [newName, setNewName ] = useState(group.name);
  const [newAbout, setNewAbout ] = useState(group.about);
  const [newTypeId, setNewTypeId ] = useState(group.typeId);

  const history = useHistory();

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
      // history.push(`/groups/${id}`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/groups/${group.id}`);
  }

  useEffect(() => {
    getGroup(group.id)
  },[dispatch, group.id])

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
        <div>
          <select onChange={updateType} defaultValue={group.typeId}>
            {types && types.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </fieldset>
  )
}

export default EditGroupForm;
