import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import HeaderButton from "../components/HeaderButton";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  const { navigation } = props;

  const item = navigation.getParam("item");
  console.log("🚀 --- PlaceDetailScreen --- item", item);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <MapPreview
          location={{ lat: item.lat, lng: item.lng }}
          style={styles.mapPreview}
        >
          <Text>Test</Text>
        </MapPreview>
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (props) => {
  const { navigation } = props;

  const item = navigation.getParam("item");

  return {
    headerTitle: item.title,
    // headerRight: (
    //   <HeaderButton
    //     iconName="ios-add"
    //     onPress={() => navigation.navigate("NewPlace")}
    //   />
    // ),
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
