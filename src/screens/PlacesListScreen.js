import React from "react";
import { View, Text, StyleSheet } from "react-native";

import HeaderButton from "../components/HeaderButton";

const PlacesListScreen = (props) => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (props) => {
  const { navigation } = props;
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButton
        iconName="ios-add"
        onPress={() => navigation.navigate("NewPlace")}
      />
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
