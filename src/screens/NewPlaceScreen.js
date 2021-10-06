import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewPlaceScreen = (props) => {
  return (
    <View>
      <Text>NewPlaceScreen</Text>
    </View>
  );
};

NewPlaceScreen.navigationOptions = (props) => {
  const { navigation } = props;
  return {
    headerTitle: "Add Place",
    // headerRight: (
    //   <HeaderButton
    //     iconName="ios-add"
    //     onPress={() => navigation.navigate("NewPlace")}
    //   />
    // ),
  };
};

const styles = StyleSheet.create({});

export default NewPlaceScreen;
