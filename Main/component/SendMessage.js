import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeArea } from "../../utility/safe-area";

const SendMessage = ({ message }) => {
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
    backgroundColor: "purple",
    borderRadius: "100%",
    borderTopRightRadius: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: "auto",
    alignSelf: "flex-start",
  },

  text1: {
    color: "white",
  },
});

export default SendMessage;
