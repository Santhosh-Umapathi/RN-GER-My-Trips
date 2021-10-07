import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//Constants
import Colors from "../constants/Colors";

const SplashScreen = () => {
  return (
    <View style={styles.containerView}>
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/e8/a4/fb/e8a4fb83188bf28e0572365dd74bdbaf.gif",
        }}
        style={{ width: "100%", height: "40%" }}
        resizeMode="cover"
      />
      <Text style={styles.text}>My Trips</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.splash,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default SplashScreen;
