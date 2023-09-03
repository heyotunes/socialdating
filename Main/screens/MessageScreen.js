import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
import { v4 as uuidv4 } from "uuid";

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
        title={
          getMatchedUserInfo(matchDetails.users, auth.currentUser.uid)
            .displayname
        }
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
                <SendMessage key={uuidv4()} message={message} />
              ) : (
                <ReceiverMessage key={uuidv4()} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={styles.view1}>
          <TextInput
            placeholder="Send Messages"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            multiline={true}
            style={styles.input1}
          />

          <TouchableOpacity style={styles.btn1}>
            <FontAwesome
              name="send"
              size={28}
              color="#2C70C0"
              onPress={sendMessage}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  safe1: {
    flex: 1,
    backgroundColor: "#EFEFEF",
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

    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    width: 390,
    marginLeft: 10,
    paddingRight: 2,
    paddingTop: 0,
    borderRadius: 40,
    paddingBottom: 10,

    shadowColor: "rgba(47, 47, 47, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  input1: {
    height: 50,
    fontSize: 15,
    width: 300,
    backgroundColor: "white",
    borderRadius: 5,
    borderTopEndRadius: 10,
    marginLeft: 20,
    borderTopLeftRadius: 10,
    color: "black",
    paddingTop: 2,
    paddingBottom: 0,
  },
  btn1: {
    fontSize: 35,
    height: 60,
    color: "red",
    marginRight: 5,
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 10,
    borderRadius: 30,
    width: 65,
  },
});

export default MessageScreen;
