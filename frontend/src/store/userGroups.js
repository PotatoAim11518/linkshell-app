import { csrfFetch } from "./csrf";

const SET_USERGROUPS = 'usergroups/SET_USERGROUPS';
const ADD_USERGROUP = 'usergroups/ADD_USERGROUP';
const REMOVE_USERGROUP = 'usergroups/REMOVE_USERGROUP';

const setUserGroups = (userGroups) => ({
  type: SET_USERGROUPS,
  userGroups
})

const add = (userGroup) => ({
  type: ADD_USERGROUP,
  userGroup
})

const remove = (userGroup) => ({
  type: REMOVE_USERGROUP,
  userGroup
})

export const getUserGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups/user/:id');
  const userGroups = await response.json();
  dispatch(setUserGroups(userGroups));
}

export const createGroup = (data) => async dispatch => {
  const response = await csrfFetch('/api/groups', {
    method: "POST",
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const newGroup = await response.json();
    dispatch(add(newGroup));
    return newGroup;
  }
}

export const deleteGroup = (groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const deleteGroup = await response.json();
    dispatch(remove(deleteGroup.id));
  }
}

const initialState = {}

const userGroupsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_USERGROUPS:
      const allUserGroups = {}
      action.userGroups.forEach((userGroup) => {
        allUserGroups[userGroup.id] = userGroup;
      });
      return {
        ...state,
        ...allUserGroups,
      };
    case ADD_GROUP:
      return {...state, [action.group.id]: action.group}
    case REMOVE_GROUP:
      const newState = {...state}
      delete newState[action.groupId]
      return newState;
    default:
      return state;
  }
}

export default userGroupsReducer;
