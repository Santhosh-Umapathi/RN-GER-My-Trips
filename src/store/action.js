import { ADD_PLACE, SET_PLACES } from "./reducer";
import * as FileSystem from "expo-file-system";
import { insertDB, fetchDB } from "../db";
import Mapbox from "../constants/Mapbox";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const newFileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + newFileName;

    const addressUrl = `${Mapbox.url}geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${Mapbox.token}`;
    console.log("🚀 --- return --- addressUrl", addressUrl);

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const addressCall = await fetch(addressUrl);
      if (!addressCall.ok) {
        throw new Error("Address not found");
      }

      const address = await addressCall.json();
      if (!address.features) {
        throw new Error("Address not found");
      }
      // console.log("🚀 --- return --- address", address.features[0].place_name);

      const dbResult = await insertDB({
        title: title,
        image: newPath,
        address: address.features[0].place_name,
        lat: location.lat,
        lng: location.lng,
      });
      // console.log("🚀 --- return --- dbResults", dbResult);

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
          lat: location.lat,
          lng: location.lng,
          address: address.features[0].place_name,
        },
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
      // console.log("🚀 --- return --- dbResults", dbResult);
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
