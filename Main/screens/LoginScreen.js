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
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle } from "../../config/firebase";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });

  if (auth.currentUser) {
    navigation.navigate("Stack");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Stack");
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Stack", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
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
            letterSpacing: 10,
            shadowColor: "rgba(70, 70, 70, 0.9)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          SWIPES
        </Text>
      </View>
      <Text style={[AppStyles.lightText, AppStyles.header]}>
        Sign In Your Account
      </Text>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.lightTextInput,
          AppStyles.lightText,
          styles.input1,
        ]}
        placeholder="Email"
        placeholderTextColor="#BEBEBE"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.lightTextInput,
          AppStyles.lightText,
          styles.input1,
        ]}
        placeholder="Password"
        placeholderTextColor="#B6B3B3"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <Text style={AppStyles.lightText}>Don't have an account? </Text>
        <InlineTextButton
          text="Sign Up"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
        <Text style={AppStyles.lightText}>Forgotten your password? </Text>
        <InlineTextButton
          text="Reset"
          onPress={() => navigation.navigate("ResetPassword")}
        />
      </View>
      <TouchableOpacity onPress={login} style={styles.touch1}>
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
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

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
  },
  input1: {
    color: "black",
  },
});

export default LoginScreen;
