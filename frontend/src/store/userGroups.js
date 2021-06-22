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

const remove = (userGroupId) => ({
  type: REMOVE_USERGROUP,
  userGroupId
})

export const getUserGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups/user/:id');
  const userGroups = await response.json();
  dispatch(setUserGroups(userGroups));
}

export const joinUserGroup = (groupId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/user/${userId}/join`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      groupId
    })
  });
  if (response.ok) {
    const newUserGroup = await response.json();
    dispatch(add(newUserGroup));
    return newUserGroup;
  }
}

export const leaveUserGroup = (groupId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/user/${userId}/leave`, {
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
    case ADD_USERGROUP:
      return {...state, [action.userGroup.id]: action.userGroup}
    case REMOVE_USERGROUP:
      const newState = {...state}
      delete newState[action.userGroupId]
      return newState;
    default:
      return state;
  }
}

export default userGroupsReducer;
