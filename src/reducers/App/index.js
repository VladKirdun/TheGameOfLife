import ActionTypes from 'ActionTypes';

const initialState = {
  grid: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GRID:
      return { ...state, grid: action.payload };

    default:
      return state;
  }
};
