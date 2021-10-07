import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
//Components
import HeaderButton from "../components/HeaderButton";

const MapScreen = (props) => {
  const { navigation } = props;
  const readOnly = navigation.getParam("readOnly");
  const savedLocation = navigation.getParam("savedLocation");
  const [selectedPlace, setSelectedPlace] = useState(savedLocation);

  const region = {
    latitude: savedLocation ? savedLocation.lat : 37.78,
    longitude: savedLocation ? savedLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let markerCoordinates;
  if (selectedPlace) {
    markerCoordinates = {
      latitude: selectedPlace.lat,
      longitude: selectedPlace.lng,
    };
  }

  const onTap = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedPlace({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const onSave = useCallback(() => {
    if (!selectedPlace) {
      return;
    }
    navigation.navigate("NewPlace", { selectedPlace });
  }, [selectedPlace]);

  useEffect(() => {
    navigation.setParams({ onSave });
  }, [onSave]);

  return (
    <MapView style={{ flex: 1 }} region={region} onPress={onTap}>
      {markerCoordinates && (
        <Marker title="pickedLocation" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (props) => {
  const { navigation } = props;
  const onSave = navigation.getParam("onSave");
  const readOnly = navigation.getParam("readOnly");

  return {
    headerTitle: "Maps",
    headerRight: !readOnly && (
      <HeaderButton iconName="ios-save" onPress={onSave} />
    ),
  };
};

export default MapScreen;
