import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

//Constants
import Colors from "../constants/Colors";

const ImageSelector = (props) => {
  const { onSelectImage } = props;

  const [selectedImage, setSelectedImage] = useState(null);

  const verifyPermissions = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("Need camera permissions");
      return false;
    }
    return true;
  };

  const imageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: "16:9",
      //   base64: true,
      quality: 0.5,
    });

    setSelectedImage(image.uri);
    onSelectImage(image.uri);
  };

  return (
    <View style={styles.containerView}>
      <View style={styles.preview}>
        {!selectedImage ? (
          <Text>No Image Selected</Text>
        ) : (
          <Image style={styles.image} source={{ uri: selectedImage }} />
        )}
      </View>
      <Button
        title={"Take Image"}
        color={Colors.primary}
        onPress={imageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  preview: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  image: { width: "100%", height: "100%" },
});

export default ImageSelector;
