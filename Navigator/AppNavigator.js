import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RegisterScreen from "../Account/RegisterScreen";
import AccountScreen from "../Account/AccountScreen";
import LoginScreen from "../Account/LoginScreen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
