import React from "react";
import { SafeArea } from "../../utility/safe-area";
import { View, Text } from "react-native";
import ChatList from "../component/ChatList";
import Header from "../component/Header";

const ChatScreen = () => {
  return (
    <SafeArea>
      <View>
        <ChatList />
      </View>
    </SafeArea>
  );
};

export default ChatScreen;
