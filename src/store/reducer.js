import Place from "../model/place";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const initialState = { places: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const { id, title, image } = action.payload;
      const newPlace = new Place(String(id), title, image);
      return { ...state, places: [...state.places, newPlace] };

    case SET_PLACES:
      const transformedData = action.payload.map(
        (item) => new Place(item.id.toString(), item.title, item.image)
      );
      console.log("🚀 --- transformedData", transformedData);
      return { ...state, places: transformedData };

    default:
      return state;
  }
};
