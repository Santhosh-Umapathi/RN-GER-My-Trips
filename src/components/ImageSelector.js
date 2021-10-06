import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";

import * as ImagePicker from "expo-image-picker";

const ImageSelector = (props) => {
  const { navigation, onSelectImage } = props;

  const [selectedImage, setSelectedImage] = useState(null);

  const verifyPermissions = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    // console.log("🚀 --- verifyPermissions --- permission", permission);

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
    // console.log("🚀 --- imageHandler --- image", image);
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
