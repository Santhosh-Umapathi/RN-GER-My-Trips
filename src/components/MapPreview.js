import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
//Constants
import Mapbox from "../constants/Mapbox";

const MapPreview = (props) => {
  const { location, onPress } = props;

  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `${Mapbox.url}styles/v1/mapbox/${Mapbox.style}static/${Mapbox.marker}(${location.lng},${location.lat})/${location.lng},${location.lat},${Mapbox.zoom},0/${Mapbox.size}?access_token=${Mapbox.token}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.containerView, ...props.style }}
    >
      {location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.image} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  image: { width: "100%", height: "100%" },
});

export default MapPreview;
