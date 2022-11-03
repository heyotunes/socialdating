import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <Text style={styles.text1}>Its a match</Text>
        <Text style={styles.text1}>
          you and {userSwiped.job} have liked each other.
        </Text>
      </View>
      <View style={styles.view3}>
        <Image
          style={styles.profileimage}
          source={{
            uri: loggedInProfile.photoURL,
          }}
        />
        <Image
          style={styles.profileimage}
          source={{
            uri: userSwiped.photoURL,
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.btn1}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.text2}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    height: "100%",
    backgroundColor: "rgba(10, 113, 208, 0.4)",
    paddingTop: 100,
  },
  view2: {
    justifyContent: "center",
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 100,
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  profileimage: {
    height: 80,
    width: 80,
    borderRadius: "100%",
  },
  text1: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    textAlign: "center",

    fontSize: 20,
    fontWeight: "bold",
  },
  btn1: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: "50%",
    marginTop: 60,
    height: 60,
  },
});

export default MatchScreen;
