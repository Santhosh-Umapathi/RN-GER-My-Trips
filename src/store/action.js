import { ADD_PLACE } from "./reducer";

export const addPlace = (title) => {
  return {
    type: ADD_PLACE,
    payload: { title },
  };
};
