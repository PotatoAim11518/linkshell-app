import { csrfFetch } from "./csrf";

const SET_LOCATIONS = 'locations/SET_LOCATIONS'

const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  locations
})

export const getLocations = () => async (dispatch) => {
  const response = await csrfFetch('/api/locations');
  const locations = await response.json();
  dispatch(setLocations(locations));
}

export const getLocation = (locationId) => async (dispatch) => {
  const response = await csrfFetch(`/api/locations/${locationId}`);
  const oneLocation = await response.json();
  dispatch(setLocations(oneLocation));
}

const initialState = {};

const locationsReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_LOCATIONS:
      const allLocations = {};
      action.locations.forEach((location) => {
        allLocations[location.id] = location;
      })
      return {...state, ...allLocations}
    default:
      return state;
  }
}

export default locationsReducer;
