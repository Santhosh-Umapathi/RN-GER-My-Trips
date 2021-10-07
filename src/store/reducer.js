//Model
import Place from "../model/place";
//Types
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
//Initial State
const initialState = { places: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const { id, title, image, lat, lng, address } = action.payload;
      const newPlace = new Place(String(id), title, image, lat, lng, address);
      return { ...state, places: [...state.places, newPlace] };

    case SET_PLACES:
      const transformedData = action.payload.map(
        (item) =>
          new Place(
            item.id.toString(),
            item.title,
            item.image,
            item.lat,
            item.lng,
            item.address
          )
      );
      return { ...state, places: transformedData };

    default:
      return state;
  }
};
