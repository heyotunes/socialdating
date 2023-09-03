import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import InlineTextButton from "../../components/inlineTextButton";
import React from "react";
import { useFonts } from "expo-font";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function ResetPassword({ navigation }) {
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });
  let [email, setEmail] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#3ED7E1", "#2C70C0"]} style={{ flex: 1 }}>
      <View style={{ marginTop: 120, alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Rock",
            color: "white",
            fontWeight: "bold",
            shadowColor: "rgba(70, 70, 70, 0.9)",
            shadowOpacity: 0.8,
            elevation: 6,
            letterSpacing: 10,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          SWIPES
        </Text>
      </View>
      <Text style={[AppStyles.lightText, AppStyles.header]}>
        Reset Password
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.lightTextInput,
          AppStyles.lightText,
        ]}
        placeholder="Email"
        placeholderTextColor="#BEBEBE"
        value={email}
        onChangeText={setEmail}
      />
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <Text style={AppStyles.lightText}>Don't have an account? </Text>
        <InlineTextButton
          text="Sign Up"
          onPress={() => navigation.navigate("Register")}
        />
      </View>

      <TouchableOpacity onPress={resetPassword} style={styles.touch1}>
        <LinearGradient
          colors={["#CA4E32", "#BD7B2E"]}
          style={{
            width: 360,
            height: 60,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 20,
            shadowColor: "rgba(14, 84, 80, 0.3)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 22,
              fontFamily: "Openbold",
            }}
          >
            Reset Password
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  btn1: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 15,
  },
  touch1: {
    backgroundColor: "#8A2F2F",
    borderRadius: 10,
    width: 350,
    height: 60,
    alignSelf: "center",
    marginTop: 30,
  },
  input1: {
    color: "black",
  },
});
