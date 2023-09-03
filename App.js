import React from "react";
import Stacknav from "./Navigator/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
//import { ThemeProvider } from "styled-components/native";
//import { Theme } from "./theme/index";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
