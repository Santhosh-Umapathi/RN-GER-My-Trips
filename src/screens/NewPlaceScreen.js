import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
//Constants
import Colors from "../constants/Colors";
//Redux
import { useDispatch } from "react-redux";
import * as actions from "../store/action";
//Components
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";

const NewPlaceScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const saveHandler = () => {
    dispatch(actions.addPlace(title, image, location));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <ImageSelector onSelectImage={setImage} />
        <LocationSelector
          onSelectLocation={setLocation}
          navigation={navigation}
        />
        <Button
          title="Save place"
          onPress={saveHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add New Place",
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
