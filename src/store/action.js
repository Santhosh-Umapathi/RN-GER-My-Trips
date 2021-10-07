import * as FileSystem from "expo-file-system";
//Types
import { ADD_PLACE, SET_PLACES } from "./reducer";
//Constants
import Mapbox from "../constants/Mapbox";
//Database
import { insertDB, fetchDB } from "../db";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const path = FileSystem.documentDirectory + fileName;

    const addressUrl = `${Mapbox.url}geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${Mapbox.token}`;

    try {
      //Move files from temp to permanent storage inside device
      await FileSystem.moveAsync({
        from: image,
        to: path,
      });

      const addressResponse = await fetch(addressUrl);
      if (!addressResponse.ok) {
        throw new Error("Error getting address");
      }

      const address = await addressResponse.json();
      if (!address.features) {
        throw new Error("Address not found");
      }

      const dbResult = await insertDB({
        title: title,
        image: path,
        address: address.features[0].place_name,
        lat: location.lat,
        lng: location.lng,
      });

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: path,
          lat: location.lat,
          lng: location.lng,
          address: address.features[0].place_name,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchDB();
      dispatch({
        type: SET_PLACES,
        payload: dbResult.rows._array,
      });
    } catch (error) {
      throw error;
    }
  };
};
