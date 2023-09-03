import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import { Image } from "react-native";

const ReceiverMessage = ({ message }) => {
  return (
    <SafeArea>
      <View style={styles.viewsend1}>
        <Image
          style={styles.image1}
          source={{
            uri: message.photoURL,
          }}
        />
        <Text style={styles.text1}>{message.message}</Text>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  viewsend1: {
    backgroundColor: "#C4C4C4",
    borderRadius: "20%",
    borderTopLeftRadius: 0,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 63,
    marginRight: 93,
    marginTop: 2,
    marginBottom: 12,
    alignSelf: "flex-start",
  },

  image1: {
    height: 52,
    width: 52,
    borderRadius: "100%",
    position: "absolute",
    top: 5,
    left: -55,
  },
  text1: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ReceiverMessage;
