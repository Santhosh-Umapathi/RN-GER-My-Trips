import { ADD_PLACE, SET_PLACES } from "./reducer";
import * as FileSystem from "expo-file-system";
import { insertDB, fetchDB } from "../db";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const newFileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + newFileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertDB({
        title: title,
        image: newPath,
        address: "test",
        lat: 15.6,
        lng: 12.3,
      });
      // console.log("🚀 --- return --- dbResults", dbResult);

      dispatch({
        type: ADD_PLACE,
        payload: { id: dbResult.insertId, title, image: newPath },
      });
    } catch (error) {
      console.log("🚀 --- return --- error", error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchDB();
      console.log("🚀 --- return --- dbResults", dbResult);
      dispatch({
        type: SET_PLACES,
        payload: dbResult.rows._array,
      });
    } catch (error) {
      console.log("🚀 --- return --- error", error);
      throw error;
    }
  };
};
