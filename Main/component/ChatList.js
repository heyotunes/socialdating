import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { matchesMask } from "nativewind/dist/utils/selector";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { auth, db } from "../../config/firebase";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", auth.currentUser.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [auth.currentUser]
  );

  const handleUnmatch = async (matchId) => {
    try {
      // Delete the match document from Firestore
      await deleteDoc(doc(db, "matches", matchId));
      // You can also update the local state to remove the match if needed
    } catch (error) {
      console.error("Error unmatching:", error);
    }
  };

  return matchesMask.length > 0 ? (
    <FlatList
      style={styles.flat1}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow matchDetails={item} onUnmatch={handleUnmatch} />
      )}
    />
  ) : (
    <View style={styles.view1}>
      <Text style={styles.text1}> No matches at the moment </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  view1: {
    padding: 5,
    marginTop: 60,
  },

  text1: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 60,
  },
  flat1: {
    height: "100%",
  },
});
export default ChatList;
