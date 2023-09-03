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
import AcctProfileScreen from "../Main/screens/AcctProfileScreen";
import LoginScreen from "../Main/screens/LoginScreen";
import Firstscreen from "../Main/screens/Firstscreen";
import RegisterScreen from "../Main/screens/RegisterScreen";
import MessageScreen from "../Main/screens/MessageScreen";
import ProfileScreen from "../Main/screens/ProfileScreen";
import ResetPassword from "../Main/screens/ResetPasswordScreen";
import DeleteuserScreen from "../Main/screens/DeleteuserScreen";
import UpdatepasswordScreen from "../Main/screens/UpdatepasswordScreen";
import RejectScreen from "../Main/screens/RejectScreen";
//import AddressScreen from "../Main/screens/AddressScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home-outline",
  Chat: "chatbox-ellipses-outline",
  Like: "heart-outline",
  Reject: "ios-heart-dislike-outline",
  Profiles: "person-outline",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarStyle: {
      backgroundColor: "white",
      height: 80,
      fontSize: 60,
      paddingTop: 10,
    },
  };
};

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "#2C70C0",
        inactiveTintColor: "#423F3F",
      }}
    >
      <Tab.Group>
        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Chat"
          component={ChatScreen}
        />

        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Like"
          component={LikeScreen}
          //initialParams={{ itemId: userSwiped }}
        />
        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Reject"
          component={RejectScreen}
          //initialParams={{ itemId: userSwiped }}
        />
        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Profiles"
          component={AcctProfileScreen}
        />
        <Tab.Screen
          options={{ headerShown: false, title: "" }}
          name="Settings"
          component={ManageAccount}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

const Stacknav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="First"
        component={Firstscreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Message"
        component={MessageScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Match"
        component={MatchScreen}
        screenOptions={{ presentation: "transparentModal" }}
      />

      <Stack.Screen
        name="Stack"
        component={TabNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deleteuser"
        component={DeleteuserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Updatepassword"
        component={UpdatepasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Stacknav;
