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
import { SafeArea } from "../../utility/safe-area";
//import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function ManageAccount() {
  const navigation = useNavigation();

  let logout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        // Handle the error here
        console.error("Logout error:", error);
      });
  };

  return (
    <SafeArea>
      <View>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
}
