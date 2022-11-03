import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import InlineTextButton from "../../components/inlineTextButton";
import React from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const background = require("../../assets/Afro.png");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("Stack", { user: userCredential.user });
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
      <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
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
        placeholderTextColor="#BEBEBE"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) =>
          validateAndSet(value, confirmPassword, setPassword)
        }
      />
      <TextInput
        style={[
          AppStyles.textInput,
          AppStyles.lightTextInput,
          AppStyles.lightText,
          styles.input1,
        ]}
        placeholder="Confirm Password"
        placeholderTextColor="#BEBEBE"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(value) =>
          validateAndSet(value, password, setConfirmPassword)
        }
      />
      <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <Text style={AppStyles.lightText}>Already have an account? </Text>
        <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
      </View>

      <TouchableOpacity onPress={signUp} style={styles.touch1}>
        <Text style={styles.btn1}>Sign Up</Text>
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

export default RegisterScreen;
