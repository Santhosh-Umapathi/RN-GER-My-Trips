import React, { useState } from "react";
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

  return (
    <View style={styles.containerView}>
      <MapPreview style={styles.map} location={selectedLocation}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location chosen yet</Text>
        )}
      </MapPreview>
      <Button
        title="Get Location"
        color={Colors.primary}
        onPress={getLocation}
      />
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
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default LocationSelector;
