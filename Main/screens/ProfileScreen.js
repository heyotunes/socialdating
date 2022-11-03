import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeArea } from "../../utility/safe-area";
import * as ImagePicker from "expo-image-picker";
//import { AuthenticationContext } from "../../services/authentication.context";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../config/firebase";
import { launchImageLibrary } from "react-native-image-picker";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { RadioButton } from "react-native-paper";
import Header from "../component/Header";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Foundation,
} from "@expo/vector-icons";

const ProfileScreen = () => {
  console.log(auth.currentUser.uid);

  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [displayname, setDisplayname] = useState(null);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [ethnicity, setEthnicity] = useState(null);

  const [story, setStory] = useState(null);
  const [religion, setReligion] = useState(null);
  const [height, setHeight] = useState(null);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);

  const incompleteForm = !job || !age || !displayname;

  const updateUserProfile = () => {
    setDoc(doc(db, "Users", auth.currentUser.uid), {
      id: auth.currentUser.uid,
      displayname: displayname,
      job: job,
      age: age,
      gender: gender,
      country: country,
      ethnicity: ethnicity,
      story: story,
      religion: religion,
      height: height,
      value: value,
      value1: value1,
      photoURL: image.uri,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };

    setImage(source);
  };

  return (
    <SafeArea>
      <ScrollView>
        <Header settings style={styles.btnicon} />

        <View style={styles.viewContainer}>
          <View style={styles.pickContainer}>
            <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
              <FontAwesome name="camera" size={44} color="#8A2F2F" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 200, height: 200 }}
                  onChangeImage={{ setImage }}
                />
              )}
            </View>
          </View>
          <View style={styles.iconContiner}>
            <MaterialCommunityIcons
              style={{ marginBottom: 1 }}
              name="face-man-profile"
              size={24}
              color="black"
            />
            <Text style={styles.infoText}>Display Name</Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={displayname}
            onChangeText={setDisplayname}
            placeholder="Enter your username"
          />
          <View style={styles.iconContiner}>
            <MaterialIcons name="work" size={24} color="black" />
            <Text style={styles.infoText}>Job</Text>
          </View>
          <TextInput
            value={job}
            onChangeText={setJob}
            style={styles.inputText}
            placeholder="Enter your occupation"
          />
          <View style={styles.iconContiner}>
            <FontAwesome name="birthday-cake" size={24} color="black" />
            <Text style={styles.infoText}>Age</Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
            maxLength={2}
          />
          <View style={styles.iconContiner}>
            <MaterialCommunityIcons
              name="human-male-height"
              size={24}
              color="black"
            />
            <Text style={styles.infoText}>Height</Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={height}
            onChangeText={setHeight}
            placeholder="Enter your height"
            keyboardType="numeric"
            maxLength={2}
          />
          <View style={styles.iconContiner}>
            <MaterialCommunityIcons
              name="gender-non-binary"
              size={24}
              color="black"
            />
            <Text style={styles.infoText}>My Gender</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="male"
                value="male"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="female"
                value="female"
                color="black"
              />
            </RadioButton.Group>
          </View>
          <TextInput
            style={styles.gender}
            value={gender}
            onChangeText={setGender}
            placeholder="Enter gender be specific"
          />
          <View style={styles.iconContiner}>
            <Foundation name="male-female" size={24} color="black" />
            <Text style={styles.infoText}>I'm Seeking</Text>
          </View>

          <RadioButton.Group
            onValueChange={(value) => setValue1(value)}
            value={value1}
          >
            <RadioButton.Item
              color="black"
              style={styles.btnradio}
              label="man"
              value="man"
            />
            <RadioButton.Item
              style={styles.btnradio}
              label="woman"
              value="woman"
              color="black"
            />
          </RadioButton.Group>

          <View style={styles.iconContiner}>
            <FontAwesome name="flag" size={24} color="black" />
            <Text style={styles.infoText}>Country</Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={country}
            onChangeText={setCountry}
            placeholder="Enter conviction"
          />

          <View style={styles.iconContiner}>
            <MaterialIcons name="group" size={24} color="black" />
            <Text style={styles.infoText}>Ethnicity</Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={ethnicity}
            onChangeText={setEthnicity}
            placeholder="Enter penitentiary"
          />

          <View style={styles.iconContiner}>
            <Entypo name="open-book" size={24} color="black" />
            <Text style={styles.infoText}>About Me</Text>
          </View>
          <TextInput
            style={styles.inputText1}
            value={story}
            onChangeText={setStory}
            placeholder="Enter story"
          />
          <TouchableOpacity
            style={styles.selectButton}
            disabled={incompleteForm}
            onPress={updateUserProfile}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  infoText: {
    fontWeight: "bold",
    fontSize: 20,

    paddingBottom: 10,
    textAlign: "center",
    color: "black",
    marginTop: 0,
  },
  inputText: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 20,
    width: 350,
    borderRadius: 4,
    borderColor: "#C4C4C4",
  },
  inputText1: {
    fontSize: 15,
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 20,
    width: 350,
    borderRadius: 4,
    borderColor: "#C4C4C4",
  },
  viewContainer: {
    paddingTop: 40,
    paddingLeft: 40,
    flex: 1,
    alignItems: "flex-start",
  },
  selectButton: {
    borderRadius: 5,
    width: 350,
    height: 50,
    alignItems: "center",
    backgroundColor: "#8A2F2F",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 60,
    marginLeft: 0,
  },
  radiocontainer: {
    flexDirection: "row",
  },
  btnradio: {
    backgroundColor: "#DEDEDE",
    color: "red",
    marginTop: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  gender: {
    fontSize: 15,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: "center",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 20,
    width: 300,
    borderRadius: 4,
    borderColor: "rgba(138, 47, 47, 1.0)",
  },
  pickContainer: {
    borderRadius: 10,
    width: 200,
    height: 200,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "rgba(228, 228, 228, 1.0)",
    justifyContent: "center",
    marginLeft: 0,
  },
  pickButton: {
    borderRadius: 5,
    position: "absolute",
    color: "rgba(138, 47, 47, 1.0)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 60,
    position: "relative",
    marginBottom: 50,
    alignItems: "center",
  },
  iconContiner: {
    marginTop: 20,
    flexDirection: "row",
  },
});
