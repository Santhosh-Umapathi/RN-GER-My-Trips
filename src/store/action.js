import { ADD_PLACE } from "./reducer";
import * as FileSystem from "expo-file-system";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const newFileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + newFileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      dispatch({
        type: ADD_PLACE,
        payload: { title, image: newPath },
      });
    } catch (error) {
      console.log("🚀 --- return --- error", error);
      throw error;
    }
  };
};
