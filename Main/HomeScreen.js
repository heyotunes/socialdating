import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View, Text } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>i am HomeScreen</Text>
      <Button
        title="Go to chat screen"
        onPress={() => navigation.navigate("Chat")}
      />
    </View>
  );
};

export default HomeScreen;
