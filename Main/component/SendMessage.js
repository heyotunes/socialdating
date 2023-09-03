import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import { useFonts } from "expo-font";

const SendMessage = ({ message }) => {
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeArea>
      <View style={styles.viewsend}>
        <Text style={styles.text1}>{message.message}</Text>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  viewsend: {
    backgroundColor: "#52B4B6",
    borderRadius: "20%",
    borderTopRightRadius: 0,
    paddingRight: 25,
    minHeight: 60,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,

    marginRight: 13,
    marginTop: 22,
    marginBottom: 22,
    marginLeft: "auto",
    alignSelf: "flex-start",
  },

  text1: {
    textAlign: "justify",
    color: "white",
    fontSize: 18,
    fontFamily: "Opensemibold",
  },
});

export default SendMessage;
