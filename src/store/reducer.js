import Place from "../model/place";
export const ADD_PLACE = "ADD_PLACE";

export const initialState = { places: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const { title, image } = action.payload;
      const newPlace = new Place(new Date().toString(), title, image);
      return { ...state, places: [...state.places, newPlace] };

    default:
      return state;
  }
};
