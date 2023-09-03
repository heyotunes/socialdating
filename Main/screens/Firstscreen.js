import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { SafeArea } from "../../utility/safe-area";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";

const Firstscreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <LinearGradient colors={["#3ED7E1", "#2C70C0"]} style={{ flex: 1 }}>
      <SafeArea>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="contain"
          source={require("../../assets/love.json")}
        />
        <View style={{ marginTop: 120, alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 35,
              fontFamily: "Rock",
              color: "white",
              fontWeight: "bold",
              letterSpacing: 10,
              shadowColor: "rgba(70, 70, 70, 0.7)",
              shadowOpacity: 0.8,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 13 },
            }}
          >
            SWIPES
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 20,
            marginTop: "90%",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            colors={["#CA4E32", "#BD7B2E"]}
            style={{
              width: 360,
              height: 60,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 20,
              shadowColor: "rgba(14, 84, 80, 0.3)",
              shadowOpacity: 0.8,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 1, height: 13 },
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 22,
                fontFamily: "Openbold",
              }}
            >
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 20,
            marginTop: "7%",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 22,
              fontFamily: "Openbold",
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </SafeArea>
    </LinearGradient>
  );
};

export default Firstscreen;
