import { csrfFetch } from "./csrf";

const SET_GROUPS = 'groups/SET_GROUPS';

const setGroups = (groups) => ({
  type: SET_GROUPS,
  groups,
})

export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups');
  const groups = await response.json();
  dispatch(setGroups(groups));
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
    default:
      return state;
  }
}

export default groupsReducer;
