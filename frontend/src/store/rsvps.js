import { csrfFetch } from "./csrf";

const SET_RSVPS = 'rsvps/SET_RSVPS';
const ADD_RSVP = 'rsvps/ADD_RSVP';
const REMOVE_RSVP = 'rsvps/REMOVE_RSVP';

const setRSVPs = (RSVPs) => ({
  type: SET_RSVPS,
  RSVPs
})

const add = (RSVP) => ({
  type: ADD_RSVP,
  RSVP
})

const remove = (rsvpId) => ({
  type: REMOVE_RSVP,
  rsvpId
})

export const getRSVPs = (limit, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/user/${userId}`, {limit});
  const RSVPs = await response.json();
  dispatch(setRSVPs(RSVPs));
}

export const addRSVP = (eventId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${eventId}/join`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      eventId
    })
  });
  if (response.ok) {
    const newRSVP = await response.json();
    dispatch(add(newRSVP));
    return newRSVP;
  }
}

export const removeRSVP = (groupId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/leave`, {
    method: "DELETE"
  });

  if (response.ok) {
    const deleteRSVP = await response.json();
    dispatch(remove(deleteRSVP.id));
  }
}

const initialState = {}

const RSVPsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_RSVPS:
      const allRSVPs = {}
      action.RSVPs.forEach((RSVP) => {
        allRSVPs[RSVP.id] = RSVP;
      });
      return {...state, ...allRSVPs};
    case ADD_RSVP:
      return {...state, [action.RSVP.id]: action.RSVP}
    case REMOVE_RSVP:
      const newState = {...state}
      delete newState[action.rsvpId]
      return newState;
    default:
      return state;
  }
}

export default RSVPsReducer;
