import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./Navigator/StackNavigator";
import AppNavigator from "./Navigator/AppNavigator";

import { AuthenticationContext } from "./services/authentication.context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <StackNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
