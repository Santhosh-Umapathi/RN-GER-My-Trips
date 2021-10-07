import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlacesNavigator from "./src/navigation/PlacesNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./src/store/reducer";
//Database
import { initSQLite } from "./src/db";
import ENV from "./env";

//Initialize Database on App Start
initSQLite();
// .then(() => console.log("initialized database"))
// .catch((error) => console.log("Error database init", error));

const rootReducer = combineReducers({
  places: placesReducer,
});

//ENV test
console.log("ENV =>", ENV.apiKey);

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
