import { csrfFetch } from "./csrf";

const SET_TYPES = 'types/SET_TYPES'

const setTypes = (types) => ({
  type: SET_TYPES,
  types
})

export const getTypes = () => async (dispatch) => {
  const response = await csrfFetch('/api/types');
  const types = await response.json();
  dispatch(setTypes(types));
}

export const getType = (typeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/types/${typeId}`);
  const oneType = await response.json();
  dispatch(setTypes(oneType));
}

const initialState = {}

const typesReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_TYPES:
      const allTypes = {};
      action.types.forEach((type) => {
        allTypes[type.id] = type;
      })
      return {...state, ...allTypes}
    default:
      return state;
  }
}

export default typesReducer;
