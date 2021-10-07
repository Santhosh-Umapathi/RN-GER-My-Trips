import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import HeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as actions from "../store/action";

const PlacesListScreen = (props) => {
  const { navigation } = props;
  const state = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadPlaces());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={state.places}
        keyExtractor={(key) => key.id}
        renderItem={({ item }) => {
          return (
            <PlaceItem
              address={item.address}
              image={item.image}
              title={item.title}
              onSelect={() => {
                navigation.navigate("PlaceDetail", {
                  item,
                });
              }}
            />
          );
        }}
      />
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
