import React, { useState, useContext, useEffect } from "react";
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
import { serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { RadioButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../component/Header";
import { Picker } from "@react-native-picker/picker";

import { useFonts } from "expo-font";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
  });

  const [image, setImage] = useState(null);
  const [displayname, setDisplayname] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");

  const [story, setStory] = useState("");
  const [intent, setIntent] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [seeking, setSeeking] = useState("");
  const [children, setChildren] = useState("");
  const [weed, setWeed] = useState("");
  const [drugs, setDrugs] = useState("");
  const [drinking, setDrinking] = useState("");
  const [gym, setGym] = useState("");

  const [agerange, setAgeRange] = useState(18);
  const [milesrange, setMilesRange] = useState(0);

  const [errorMsg, setErrorMsg] = useState();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // Handle the result of the image picker here
      const source = { uri: result.uri };
      setImage(source);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const docRef = doc(db, "Users", auth.currentUser.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setImage(data.photoURL);
          setDisplayname(data.displayname);
          setAge(data.age);
          setJob(data.job);
          setCity(data.city);
          setStates(data.states);
          setGender(data.gender);
          setHeight(data.height);

          setIntent(data.intent);

          setDrugs(data.drugs);
          setWeed(data.weed);
          setSeeking(data.seeking);
          setAgeRange(data.agerange);
          setGym(data.gym);
          setChildren(data.children);
          setMilesRange(data.milesrange);
          setStory(data.story);
          setDrinking(data.drinking);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const incompleteForm =
    !age || !displayname || !city || !height || !states || !gender || !seeking;

  const updateUserProfile = () => {
    setDoc(doc(db, "Users", auth.currentUser.uid), {
      id: auth.currentUser.uid,
      displayname: displayname,
      gender: gender,
      age: age,
      height: height,
      job: job,
      states: states,
      city: city,
      intent: intent,

      story: story,
      agerange: agerange,
      milesrange: milesrange,
      seeking: seeking,
      weed: weed,
      drugs: drugs,
      gym: gym,
      drinking: drinking,
      children: children,

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

  //const geocode = async () => {
  // const geocodedLocation = await Location.geocodeAsync(address);
  //setLocation(geocodedLocation);
  // console.log("Geocoded Address:");
  // console.log(geocodedLocation);
  //};

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeArea
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginBottom: 10,
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Header settings />
      </View>
      <ScrollView>
        <View style={styles.viewContainer1}>
          <View style={styles.pickContainer}>
            <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
              <MaterialIcons
                name="camera-alt"
                size={74}
                color="#2C70C0"
                style={{
                  marginTop: 170,
                  position: "absolute",
                }}
              />
              <View style={styles.imageContainer}>
                {image && (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 180, height: 180, borderRadius: 40 }}
                    onChangeImage={{ setImage }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputText}
            value={displayname}
            onChangeText={setDisplayname}
            placeholder="Name/Nnickname"
            maxLength={15}
          />

          <TextInput
            value={job}
            onChangeText={setJob}
            style={styles.inputText}
            placeholder="Profession"
            maxLength={12}
          />

          <TextInput
            style={styles.inputText}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            keyboardType="numeric"
            maxLength={2}
          />

          <TextInput
            style={styles.inputText}
            value={states}
            onChangeText={setStates}
            placeholder="State"
            maxLength={12}
          />

          <TextInput
            style={styles.inputText}
            value={city}
            onChangeText={setCity}
            placeholder="City"
            maxLength={12}
          />

          <TextInput
            style={styles.inputText1}
            value={story}
            multiline={true}
            onChangeText={(text) => {
              if (text.length <= 95) {
                setStory(text);
              }
            }}
            maxLength={200}
            placeholder="Bio"
          />
        </View>

        <View style={styles.viewContainer2}>
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
              onValueChange={(value) => setGender(value)}
              value={gender}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="Male"
                value="male"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Female"
                value="female"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <Foundation name="male-female" size={24} color="black" />
            <Text style={styles.infoText}>I'm Seeking</Text>
          </View>

          <RadioButton.Group
            onValueChange={(value) => setSeeking(value)}
            value={seeking}
          >
            <RadioButton.Item
              color="black"
              style={styles.btnradio}
              label="Male"
              value="male"
            />
            <RadioButton.Item
              style={styles.btnradio}
              label="Female"
              value="female"
              color="black"
            />
          </RadioButton.Group>

          <View style={styles.iconContiner}>
            <MaterialIcons name="child-friendly" size={24} color="black" />

            <Text style={styles.infoText}>Children</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setChildren(value)}
              value={children}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="Dont have children"
                value="Dont have children"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Have children"
                value="Have children"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <MaterialCommunityIcons
              name="gender-non-binary"
              size={24}
              color="black"
            />
            <Text style={styles.infoText}>Dating Intentions</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setIntent(value)}
              value={intent}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="Life partner"
                value="Life partner"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Long-term relationship"
                value="Long-term relationship"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Short-term relationship"
                value="Short-term relationship"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Friendship"
                value="Friendship"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <Text style={styles.infoText1}>Interests</Text>
          </View>

          <View style={styles.iconContiner}>
            <FontAwesome5
              name="canadian-maple-leaf"
              size={24}
              color="black"
              style={{ paddingRight: 5 }}
            />
            <Text style={styles.infoText}>Weed</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setWeed(value)}
              value={weed}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="No"
                value="No"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Yes"
                value="Yes"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Sometimes"
                value="Sometimes"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <FontAwesome5
              name="pills"
              size={24}
              color="black"
              style={{ paddingRight: 5 }}
            />
            <Text style={styles.infoText}>Drugs</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setDrugs(value)}
              value={drugs}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="No"
                value="No"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Yes"
                value="Yes"
                color="black"
              />

              <RadioButton.Item
                style={styles.btnradio}
                label="Sometimes"
                value="Sometimes"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <FontAwesome5
              name="dumbbell"
              size={24}
              color="black"
              style={{ paddingRight: 5 }}
            />
            <Text style={styles.infoText}>Gym</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setGym(value)}
              value={gym}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="No"
                value="No"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Yes"
                value="Yes"
                color="black"
              />

              <RadioButton.Item
                style={styles.btnradio}
                label="Sometimes"
                value="Sometimes"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <Entypo name="drink" size={20} color="black" />
            <Text style={styles.infoText}>Drinking</Text>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setDrinking(value)}
              value={drinking}
              color="white"
            >
              <RadioButton.Item
                style={styles.btnradio}
                label="No"
                value="No"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Yes"
                value="Yes"
                color="black"
              />

              <RadioButton.Item
                style={styles.btnradio}
                label="Sometimes"
                value="Sometimes"
                color="black"
              />
              <RadioButton.Item
                style={styles.btnradio}
                label="Prefer not to say"
                value="Prefer not to say"
                color="black"
              />
            </RadioButton.Group>
          </View>

          <View style={styles.iconContiner}>
            <FontAwesome5
              name="ruler-vertical"
              size={24}
              color="black"
              style={{ paddingRight: 5, marginTop: 5 }}
            />
            <Text style={styles.infoText}>Height</Text>
          </View>

          <Picker
            selectedValue={height}
            onValueChange={(itemValue, itemIndex) => setHeight(itemValue)}
          >
            <Picker.Item label="4'0" value="4'0" />
            <Picker.Item label="4'1" value="4'1" />
            <Picker.Item label="4'2" value="4'2" />
            <Picker.Item label="4'3" value="4'3" />
            <Picker.Item label="4'4" value="4'4" />
            <Picker.Item label="4'5" value="4'5" />
            <Picker.Item label="4'6" value="4'6" />
            <Picker.Item label="4'7" value="4'7" />
            <Picker.Item label="4'8" value="4'8" />
            <Picker.Item label="4'9" value="4'9" />
            <Picker.Item label="4'10" value="4'10" />
            <Picker.Item label="4'11" value="4'11" />
            <Picker.Item label="5'0" value="5'0" />
            <Picker.Item label="5'1" value="5'1" />
            <Picker.Item label="5'2" value="5'2" />
            <Picker.Item label="5'3" value="5'3" />
            <Picker.Item label="5'4" value="5'4" />
            <Picker.Item label="5'5" value="5'5" />
            <Picker.Item label="5'6" value="5'6" />
            <Picker.Item label="5'7" value="5'7" />
            <Picker.Item label="5'8" value="5'8" />
            <Picker.Item label="5'9" value="5'9" />
            <Picker.Item label="5'10" value="5'10" />
            <Picker.Item label="5'11" value="5'11" />
            <Picker.Item label="6'0" value="6'0" />
            <Picker.Item label="6'1" value="6'1" />
            <Picker.Item label="6'2" value="6'2" />
            <Picker.Item label="6'3" value="6'3" />
            <Picker.Item label="6'4" value="6'4" />
            <Picker.Item label="6'5" value="6'5" />
            <Picker.Item label="6'6" value="6'6" />
            <Picker.Item label="6'7" value="6'7" />
            <Picker.Item label="6'8" value="6'8" />
            <Picker.Item label="6'9" value="6'9" />
            <Picker.Item label="6'10" value="6'10" />
            <Picker.Item label="6'11" value="6'11" />
            <Picker.Item label="7'0" value="7'0" />
          </Picker>

          <View style={styles.iconContiner}>
            <Text style={styles.infoText1}>Preferences</Text>
          </View>

          <View style={styles.iconContiner1}>
            <Text style={styles.infoText}>Age range</Text>
            <Text style={styles.infoText2}>18 - {agerange}</Text>
            <Slider
              style={{ width: 350, height: 40 }}
              minimumValue={18}
              maximumValue={65}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#2C70C0"
              step={1}
              onValueChange={(value) => setAgeRange(value)}
              value={agerange}
            />
          </View>

          <View style={styles.iconContiner1}>
            <Text style={styles.infoText}>Location miles</Text>
            <Text style={styles.infoText2}>{milesrange} mi</Text>
            <Slider
              style={{ width: 350, height: 40 }}
              minimumValue={0}
              maximumValue={65}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#2C70C0"
              step={1}
              onValueChange={(value) => setMilesRange(value)}
              value={milesrange}
            />
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            disabled={incompleteForm}
            onPress={updateUserProfile}
          >
            <Text
              style={{ color: "white", fontSize: 22, fontFamily: "Openbold" }}
            >
              Save Profile
            </Text>
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
    fontFamily: "Openbold",
    paddingBottom: 10,
    textAlign: "center",
    color: "#828181",
    marginTop: 0,
  },
  infoText1: {
    fontSize: 25,
    fontFamily: "Openextrabold",
    paddingBottom: 10,
    textAlign: "center",
    marginLeft: 5,
    color: "black",
    marginTop: 15,
  },
  infoText2: {
    fontSize: 20,
    fontFamily: "Openextrabold",
    paddingBottom: 10,
    textAlign: "center",
    marginLeft: 5,
    color: "black",
    marginTop: 15,
  },
  inputText: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 2,
    fontFamily: "Openbold",
    marginTop: 25,
    marginBottom: 20,
    width: 380,
    color: "black",
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#D9D9D9",
  },
  inputText1: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 15,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 20,
    fontFamily: "Openbold",
    width: 380,
    height: 140,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#D9D9D9",
  },
  viewContainer1: {
    paddingTop: 20,
    paddingLeft: 0,

    alignItems: "center",
  },
  viewContainer2: {
    paddingTop: 40,
    paddingLeft: 0,

    alignSelf: "center",
  },
  selectButton: {
    borderRadius: 10,
    width: 380,
    height: 70,
    alignItems: "center",
    backgroundColor: "#2C70C0",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 60,
    marginLeft: 0,
    shadowColor: "rgba(14, 84, 80, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  radiocontainer: {
    flexDirection: "row",
  },
  btnradio: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,

    width: 380,
    color: "white",
    marginTop: 10,
    borderRadius: 10,
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
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#2C70C0",
    width: 180,
    paddingBottom: 10,
    height: 180,
    marginBottom: 50,
    alignItems: "center",
    backgroundColor: "#D1D1D1",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 0,
    shadowColor: "rgba(70, 70, 70, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  pickButton: {
    borderRadius: 5,
    position: "absolute",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 0,
    position: "relative",
    marginBottom: 0,
    alignItems: "center",
  },
  iconContiner: {
    marginTop: 50,
    flexDirection: "row",
  },
  iconContiner1: {
    marginTop: 20,
    flexDirection: "column",
  },
});
