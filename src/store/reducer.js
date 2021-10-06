import Place from "../model/place";
export const ADD_PLACE = "ADD_PLACE";

export const initialState = { places: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const { title } = action.payload;
      const newPlace = new Place(new Date().toString(), title);
      return { ...state, places: [...state.places, newPlace] };

    default:
      return state;
  }
};
