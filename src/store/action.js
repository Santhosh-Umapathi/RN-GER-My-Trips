import { ADD_PLACE } from "./reducer";

export const addPlace = (title, image) => {
  return {
    type: ADD_PLACE,
    payload: { title, image },
  };
};
