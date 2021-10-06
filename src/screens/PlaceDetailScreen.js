import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderButton from "../components/HeaderButton";

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (props) => {
  const { navigation } = props;

  const title = navigation.getParam("placeTitle");

  return {
    headerTitle: title,
    // headerRight: (
    //   <HeaderButton
    //     iconName="ios-add"
    //     onPress={() => navigation.navigate("NewPlace")}
    //   />
    // ),
  };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
