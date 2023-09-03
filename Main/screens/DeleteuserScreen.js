import { Button, View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../../styles/AppStyles";
import { auth, db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import {
  signOut,
  updatePassword,
  signInWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import Header from "../component/Header";
import { SafeArea } from "../../utility/safe-area";
import { useFonts } from "expo-font";

const DeleteuserScreen = ({ navigation }) => {
  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
  });

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          // Get all todos for user and delete
          let batch = writeBatch(db);
          const q = query(
            collection(db, "Users"),
            where("userId", "==", auth.currentUser.uid)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user)
              .then(() => {
                navigation.popToTop();
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <View
        style={{ paddingLeft: 20, backgroundColor: "white", paddingTop: 10 }}
      >
        <Header />
      </View>
      <View style={AppStyles.container}>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.darkTextInput]}
          placeholder="Current Password"
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword}
        />

        <TouchableOpacity
          onPress={deleteUserAndToDos}
          style={{
            height: 70,
            width: 350,
            backgroundColor: "#2C70C0",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 20,

            marginTop: 30,
            shadowColor: "rgba(14, 84, 80, 0.1)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontFamily: "Openbold",
              color: "white",
              paddingLeft: 0,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            Delete User{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default DeleteuserScreen;
