import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import HeaderButton from "../components/HeaderButton";

const MapScreen = (props) => {
  const { navigation } = props;
  const [selectedPlace, setSelectedPlace] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
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
    <MapView style={styles.map} region={region} onPress={onTap}>
      {markerCoordinates && (
        <Marker title="pickedLocation" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (props) => {
  const { navigation } = props;
  const onSave = navigation.getParam("onSave");
  return {
    headerTitle: "Maps",
    headerRight: <HeaderButton iconName="ios-save" onPress={onSave} />,
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
