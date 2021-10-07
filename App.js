import React, { useEffect, useState } from "react";
//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
//Reducers
import placesReducer from "./src/store/reducer";
//Database
import { initSQLite } from "./src/db";
//ENV
import ENV from "./env";
//Screens
import SplashScreen from "./src/screens/SplashScreen";
import PlacesNavigator from "./src/navigation/PlacesNavigator";

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

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      {showSplash ? <SplashScreen /> : <PlacesNavigator />}
    </Provider>
  );
};

export default App;
