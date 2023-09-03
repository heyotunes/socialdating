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
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#3ED7E1", "#2C70C0"]} style={{ flex: 1 }}>
      <View style={{ marginTop: 100, alignSelf: "center" }}>
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
        Sign Up and Start Swiping
      </Text>
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
        <InlineTextButton
          text="Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>

      <TouchableOpacity onPress={signUp} style={styles.touch1}>
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
            Create Account
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
    marginTop: 30,
    alignSelf: "center",
  },
  input1: {
    color: "black",
  },
});

export default RegisterScreen;
