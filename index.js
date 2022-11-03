import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./Main/screens/LoginScreen";
import RegisterScreen from "./Main/screens/RegisterScreen";
import TabNavigator from "./Navigator/StackNavigator";
import MessageScreen from "./Main/screens/MessageScreen";
import ResetPassword from "./Main/screens/ResetPasswordScreen";
import ProfileScreen from "./Main/screens/ProfileScreen";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
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
        name="Stack"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
