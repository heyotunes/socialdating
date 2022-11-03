import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../Main/screens/HomeScreen";
import ChatScreen from "../Main/screens/ChatScreen";
import LikeScreen from "../Main/screens/LikeScreen";
//import ProfileScreen from "../Main/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//import ManageAccount from "../Main/screens/ManageAccountScreen";
import MatchScreen from "../Main/screens/MatchScreen";
import ManageAccount from "../Main/screens/ManageAccountScreen";

//const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Match"
        component={MatchScreen}
        screenOptions={{ presentation: "transparentModal" }}
      />
    </HomeStack.Navigator>
  );
};
const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={ChatScreen}
      />
    </ChatStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home1: "home-sharp",
  Chat1: "chatbubble",
  Like: "heart",
  Profile: "person",
  settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "#8A2F2F",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Group>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home1"
          component={HomeStackScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Chat1"
          component={ChatStackScreen}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="Like"
          component={LikeScreen}
          //initialParams={{ itemId: userSwiped }}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="settings"
          component={ManageAccount}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigator;
