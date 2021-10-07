import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Constants
import Colors from "../constants/Colors";

const HeaderButton = ({ onPress = () => {}, iconName = "" }) => {
  return (
    <Ionicons
      name={iconName}
      size={25}
      color={Platform.OS === "android" ? "#fff" : Colors.primary}
      style={{ paddingHorizontal: 10 }}
      onPress={onPress}
    />
  );
};

export default HeaderButton;
