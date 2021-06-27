import { csrfFetch } from "./csrf";

const SET_USERGROUPS = "usergroups/SET_USERGROUPS";
const JOIN_USERGROUP = "usergroups/JOIN_USERGROUP";
const LEAVE_USERGROUP = "usergroups/LEAVE_USERGROUP";

const setUserGroups = (userGroups) => ({
  type: SET_USERGROUPS,
  userGroups,
});

const join = (userGroup) => ({
  type: JOIN_USERGROUP,
  userGroup,
});

const leave = (userGroupId) => ({
  type: LEAVE_USERGROUP,
  userGroupId,
});

export const getUserGroups = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/usergroups/user/${userId}`);
  const userGroups = await response.json();
  dispatch(setUserGroups(userGroups));
};

export const joinUserGroup = (userId, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/usergroups`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      groupId,
    }),
  });
  if (response.ok) {
    const newUserGroup = await response.json();
    dispatch(join(newUserGroup));
    return newUserGroup;
  }
};

export const leaveUserGroup = (userId, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/usergroups`, {
    method: "DELETE",
    body: JSON.stringify({
      userId,
      groupId,
    }),
  });

  if (response.ok) {
    const deleteUserGroup = await response.json();
    dispatch(leave(deleteUserGroup.id));
  }
};

const initialState = {};

const userGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERGROUPS:
      const allUserGroups = {};
      action.userGroups.forEach((userGroup) => {
        allUserGroups[userGroup.id] = userGroup;
      });
      return { ...state, ...allUserGroups };
    case JOIN_USERGROUP:
      return { ...state, [action.userGroup.id]: action.userGroup };
    case LEAVE_USERGROUP:
      const newState = { ...state };
      delete newState[action.userGroupId];
      return newState;
    default:
      return state;
  }
};

export default userGroupsReducer;
