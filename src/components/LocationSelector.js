import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
//Location picker
import * as LocationPicker from "expo-location";
import MapPreview from "./MapPreview";

const LocationSelector = (props) => {
  const { navigation, onSelectLocation } = props;

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedPlace = navigation.getParam("selectedPlace");
  // console.log("🚀 --- LocationSelector --- selectedPlace", selectedPlace);

  useEffect(() => {
    if (selectedPlace) {
      setSelectedLocation(selectedPlace);
      onSelectLocation(selectedPlace);
    }
  }, [selectedPlace]);

  const verifyPermissions = async () => {
    const permission = await LocationPicker.requestForegroundPermissionsAsync();
    // console.log("🚀 --- verifyPermissions --- permission", permission);

    if (permission.status !== "granted") {
      Alert.alert("Need location permissions");
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    setIsLoading(true);
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    try {
      const location = await LocationPicker.getCurrentPositionAsync({
        // timeInterval: 5000,
      });
      // console.log("🚀 --- getLocation --- location", location);
      setSelectedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onSelectLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      // console.log("🚀 --- getLocation --- error", error);
      Alert.alert("Cannot get the location");
    }
    setIsLoading(false);
  };

  const pickOnMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.containerView}>
      <MapPreview
        style={styles.map}
        location={selectedLocation}
        onPress={pickOnMap}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Location"
          color={Colors.primary}
          onPress={getLocation}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    marginBottom: 15,
  },
  map: {
    marginBottom: 15,
    width: "100%",
    height: 150,
    borderColor: Colors.primary,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "orange",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});

export default LocationSelector;
