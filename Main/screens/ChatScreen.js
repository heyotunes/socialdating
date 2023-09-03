import React from "react";
//import { SafeArea } from "../../utility/safe-area";
import { View, Text } from "react-native";
import ChatList from "../component/ChatList";
import Header from "../component/Header";
import { useFonts } from "expo-font";

const ChatScreen = () => {
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rocksalt: require("../component/fonts/RockSalt-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeArea>
      <View style={{ marginLeft: 30, marginTop: 30, fontSize: 22 }}>
        <Text style={{ fontSize: 40, fontFamily: "Openbold" }}>Chats</Text>
      </View>
      <View style={{ marginBottom: 100 }}>
        <ChatList />
      </View>
    </SafeArea>
  );
};

export default ChatScreen;
