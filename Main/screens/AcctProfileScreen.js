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

  //let logout = () => {
  // signOut(auth).then(() => {
  //  navigation.navigate("Login");
  //});
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
      <ScrollView>
        <View
          style={{
            marginBottom: 20,
            shadowColor: "rgba(14, 84, 80, 0.1)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          <Image style={styles.photo} source={{ uri: profiles.photoURL }} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{
            height: 70,
            width: 350,
            backgroundColor: "#2C70C0",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#8BB6E8",
            marginTop: 20,
            marginBottom: 20,
            shadowColor: "rgba(14, 84, 80, 0.1)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontFamily: "Openbold",
              color: "white",
              paddingLeft: 0,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            Edit Profile
          </Text>
          <FontAwesome5
            name="pen"
            size={24}
            color="white"
            style={{
              alignSelf: "center",
              paddingLeft: 10,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#F3F3F3",
            width: 350,
            borderRadius: 20,
            alignSelf: "center",
            borderWidth: 2,
            borderColor: "#B9B9B9",
            marginBottom: 40,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.displayname}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginTop: 0,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 20,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Gender
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.gender}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Age
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.age}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 0,
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Height
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.height}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Occupation
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.job}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                City
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.city}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
              flexDirection: "row",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Seeking
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.seeking}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 20,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Intentions
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.intent}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 0,

              borderColor: "#D3D3D3",
              flexDirection: "row",
              width: "100%",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                About me
              </Text>
              <Text
                style={{
                  paddingTop: 0,
                  paddingBottom: 20,
                  paddingLeft: 10,
                  textAlign: "left",
                  width: 290,
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.story}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Weed
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.weed}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Drugs
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.drugs}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Gym
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.gym}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Drinking
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.drinking}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              marginRight: 10,
              marginLeft: 10,
              marginBottom: 20,
              borderColor: "#D3D3D3",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 10,
                  fontSize: 18,
                  fontFamily: "Openbold",
                }}
              >
                Children
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  textAlign: "left",
                  fontSize: 16,
                  fontFamily: "Openmedium",
                  color: "#959595",
                }}
              >
                {profiles.children}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            width: 350,
            height: 370,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#B9B9B9",
            marginTop: 10,
            marginBottom: 50,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Deleteuser");
            }}
            style={{
              marginTop: 20,
              marginLeft: 10,
              marginRight: 10,
              borderTopWidth: 0,
              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Openmedium",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                color: "black",
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Updatepassword");
            }}
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,

              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Openmedium",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                color: "black",
              }}
            >
              UpdatePassword
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,

              borderBottomWidth: 1,
              borderColor: "#D3D3D3",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Openmedium",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                color: "black",
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 0,
              marginLeft: 10,
              marginRight: 10,

              borderColor: "#D3D3D3",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Openmedium",
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                color: "black",
              }}
            >
              Terms & Condition
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AcctProfileScreen;

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
