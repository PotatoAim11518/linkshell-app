import { csrfFetch } from "./csrf";

const SET_EVENTS = 'events/SET_EVENTS';
const UPDATE_EVENT = 'events/UPDATE_EVENT';
const REMOVE_EVENT = 'events/REMOVE_EVENT'


// action creators
const setEvents = (events) => ({
  type: SET_EVENTS,
  events
})

const update = (events) => ({
  type: UPDATE_EVENT,
  events
})

const remove = (eventId) => ({
  type: REMOVE_EVENT,
  eventId
})

// thunks
export const getEvents = (limit) => async (dispatch) => {
  const response = await csrfFetch('/api/events', { limit });
  const events = await response.json();
  dispatch(setEvents(events));
}

export const getEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  const event = await response.json();
  dispatch(setEvents(event));
}

export const getGroupEvents = (groupId, limit) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/groups/${groupId}`, { limit });
  const events = await response.json();
  dispatch(setEvents(events));
}

export const getHostEvents = (hostId, limit) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/user${hostId}`, { limit });
  const event = await response.json();
  dispatch(setEvents(event));
}

export const createEvent = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const event = await response.json();
    dispatch(update(event));
    return event;
  }
}

export const updateEvent = (data, eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const updatedEvent = await response.json();
    dispatch(update(updatedEvent));
    return updatedEvent;
  }
}

export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = response.json();
    dispatch(remove(event));
  }
}

const initialState = {};

const eventsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_EVENTS:
      const allEvents = {};
      action.events.forEach((event) => {
        allEvents[event.id] = event;
      })
      return { ...state, ...allEvents }
    case UPDATE_EVENT:
      return {...state, [action.event.id]: action.event};
    case REMOVE_EVENT:
      const newState = {...state};
      delete newState.action.eventId;
      return newState
    default:
      return state;
  }
}

export default eventsReducer;
