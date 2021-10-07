import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Mapbox from "../constants/Mapbox";

const MapPreview = (props) => {
  const { location } = props;

  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `${Mapbox.url}${Mapbox.style}static/${Mapbox.marker}(${location.lng},${location.lat})/${location.lng},${location.lat},${Mapbox.zoom},0/${Mapbox.size}?access_token=${Mapbox.token}`;
  }

  return (
    <View style={{ ...styles.containerView, ...props.style }}>
      {location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.image} />
      ) : (
        props.children
      )}
    </View>
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
