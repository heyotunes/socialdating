import React from "react";
import { Navigation } from "./index";
//import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContextProvider } from "./services/authentication.context";
import * as firebase from "firebase";
//import StackNavigator from "./StackNavigator";

const firebaseConfig = {
  apiKey: "AIzaSyArb0l551sYRnEDBz1gMF5kPxiZ2BXb1_o",
  authDomain: "afromeet-85c92.firebaseapp.com",
  projectId: "afromeet-85c92",
  storageBucket: "afromeet-85c92.appspot.com",
  messagingSenderId: "179506998587",
  appId: "1:179506998587:web:65d87f7dc829895d455b1e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <AuthenticationContextProvider>
      <Navigation />
    </AuthenticationContextProvider>
  );
}
