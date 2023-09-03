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

//import * as ImagePicker from "expo-image-picker";
//import { AuthenticationContext } from "../../services/authentication.context";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../config/firebase";
//import { launchImageLibrary } from "react-native-image-picker";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
//import { RadioButton } from "react-native-paper";
//import { LinearGradient } from "expo-linear-gradient";
//import Header from "../component/Header";
import { useFonts } from "expo-font";
import { signOut } from "firebase/auth";

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Foundation,
  Octicons,
  EvilIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { getDocs, getDoc, collection, onSnapshot } from "firebase/firestore";

import { SafeArea } from "../../utility/safe-area";

const AcctProfileScreen = () => {
  const navigation = useNavigation();
  //const [firstname, setFirstname] = useState("");
  const [profiles, setProfiles] = useState([]);

  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    let unsub;
    const fetchProfile = async () => {
      unsub = onSnapshot(doc(db, "Users", auth.currentUser.uid), (snapshot) => {
        setProfiles({
          id: snapshot.id,
          ...snapshot.data(),
        });
      });
    };
    fetchProfile();
    return unsub;
  }, []);

  console.log(profiles);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeArea
      style={{
        backgroundColor: "white",
      }}
    >
      <ScrollView></ScrollView>
    </SafeArea>
  );
};

export default UnmatchScreen;

const styles = StyleSheet.create({
  photo: {
    height: 180,
    width: 180,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 40,
    borderColor: "#8BB6E8",
    borderWidth: 2,
  },
});
