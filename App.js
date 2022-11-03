import React from "react";
import Navigation from "./index";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { Theme } from "./theme/index";

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
