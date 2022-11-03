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
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle } from "../../config/firebase";

const LoginScreen = ({ navigation }) => {
  const background = require("../../assets/Afro.png");

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

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
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
        <Text style={styles.btn1}> Login</Text>
      </TouchableOpacity>
    </ImageBackground>
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
  },
  input1: {
    color: "black",
  },
});

export default LoginScreen;
