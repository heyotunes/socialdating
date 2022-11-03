import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.view1}>
      <View style={styles.view1}>
        <TouchableOpacity
          style={styles.touch1}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.text1}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={styles.touch2}>
          <Entypo name="phone" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    paddingLeft: 2,
    fontSize: 20,
    fontWeight: "bold",
  },
  touch1: {
    padding: 2,
  },
  touch2: {
    borderRadius: "100%",
    marginRight: 4,
    padding: 3,
    backgroundColor: "red",
  },
});
export default Header;
