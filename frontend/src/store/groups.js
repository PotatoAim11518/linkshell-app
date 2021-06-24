import { csrfFetch } from "./csrf";

const SET_GROUPS = 'groups/SET_GROUPS';
const ADD_GROUP = 'groups/ADD_GROUP';
const REMOVE_GROUP = 'groups/REMOVE_GROUP';
const UPDATE_GROUP = 'groups/UPDATE_GROUP';

const setGroups = (groups) => ({
  type: SET_GROUPS,
  groups
})
const add = (group) => ({
  type: ADD_GROUP,
  group
})

const update = (group) => ({
  type: UPDATE_GROUP,
  group
})
const remove = (groupId) => ({
  type: REMOVE_GROUP,
  groupId
})

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups');
  const groups = await response.json();
  dispatch(setGroups(groups));
}

export const getGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`);
  const group = await response.json();
  dispatch(add(group));
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

export const updateGroup = (data) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const updatedGroup = await response.json();
    dispatch(update(updatedGroup));
    return updatedGroup;
  }
}

export const deleteGroup = (groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(remove(groupId));
  }
}

const initialState = {}

const groupsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_GROUPS:
      const allGroups = {}
      action.groups.forEach( (group) => {
        allGroups[group.id] = group;
      });
      return {
        ...state,
        ...allGroups,
      };
    case ADD_GROUP:
      return {...state, [action.group.id]: action.group}
    case UPDATE_GROUP:
      return {...state, [action.group.id]: action.group}
    case REMOVE_GROUP:
      const newState = {...state}
      delete newState[action.groupId]
      return newState;
    default:
      return state;
  }
}

export default groupsReducer;
