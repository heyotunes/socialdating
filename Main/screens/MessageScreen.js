import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from "react-native";
import { Keyboard } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import Header from "../component/Header";
import { auth, db } from "../../config/firebase";
import getMatchedUserInfo from "../../lib/getMatchedUserinfo";
import { useRoute } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Input } from "postcss";
import ReceiverMessage from "../component/ReceiverMessage";
import SendMessage from "../component/SendMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const MessageScreen = () => {
  const { params } = useRoute();
  const { matchDetails } = params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: auth.currentUser.uid,

      photoURL: matchDetails.users[auth.currentUser.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeArea style={styles.safe1}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, auth.currentUser.uid).job}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.key1}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={styles.flat1}
            inverted={-1}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === auth.currentUser.uid ? (
                <SendMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={styles.view1}>
          <TextInput
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            style={styles.input1}
          />

          <Button
            onPress={sendMessage}
            title="Send"
            color="blue"
            style={styles.btn1}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  safe1: {
    flex: 1,
  },
  key1: {
    flex: 1,
  },
  flat1: {
    paddingLeft: 4,
  },
  view1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: "gray",
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  input1: {
    height: 60,
    fontSize: 20,
    width: 350,
    backgroundColor: "white",
    color: "black",
  },
  btn1: {
    fontSize: 35,
    height: 60,
    color: "white",
    marginRight: 5,
    backgroundColor: "green",
  },
});

export default MessageScreen;
