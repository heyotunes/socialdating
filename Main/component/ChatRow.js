import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import { auth, db } from "../../config/firebase";
import getMatchedUserInfo from "../../lib/getMatchedUserinfo";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(
      getMatchedUserInfo(matchDetails.users, auth.currentUser.uid)
    );
  }, [matchDetails, auth.currentUser]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  return (
    <SafeArea>
      <TouchableOpacity
        style={styles.touch1}
        onPress={() =>
          navigation.navigate("Message", {
            matchDetails,
          })
        }
      >
        <Image
          style={styles.image1}
          source={{ uri: matchedUserInfo?.photoURL }}
        />
        <View>
          <Text style={styles.text1}>{matchedUserInfo?.job}</Text>
          <Text style={styles.text1}>{lastMessage || "Say Hi!"}</Text>
        </View>
      </TouchableOpacity>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  touch1: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    backgroundColor: "white",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
    borderRadius: "30%",
  },
  image1: {
    borderRadius: "100%",
    height: 76,
    width: 76,
    marginRight: 4,
  },
  text1: {
    fontSize: 20,
    fontWeight: "700",
  },
});
export default ChatRow;
