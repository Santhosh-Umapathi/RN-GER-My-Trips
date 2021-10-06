import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { ScrollView } from "react-navigation";
import Colors from "../constants/Colors";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/action";

const NewPlaceScreen = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const saveHandler = () => {
    dispatch(actions.addPlace(title));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <Button
          title="Save place"
          onPress={saveHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
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

const styles = StyleSheet.create({
  form: { margin: 30 },
  label: { fontSize: 18, marginBottom: 15 },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginBottom: 10,
    paddingHorizontal: 6,
  },
});

export default NewPlaceScreen;
