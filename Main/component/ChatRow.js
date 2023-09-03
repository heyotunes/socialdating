import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { SafeArea } from "../../utility/safe-area";
import { auth, db } from "../../config/firebase";
import getMatchedUserInfo from "../../lib/getMatchedUserinfo";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  MaterialIcons,
  Entypo,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

//import { collection, onSnapshot, orderBy, query, getDocs, deleteDoc } from "firebase/firestore";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
  serverTimestamp,
  getDocs,
  getDoc,
  collectionGroup,
  orderBy,
  Query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const ChatRow = ({ matchDetails, onUnmatch }) => {
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    setMatchedUserInfo(
      getMatchedUserInfo(matchDetails.users, auth.currentUser.uid)
    );
  }, [matchDetails, auth.currentUser]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.profileContainer}>
      <SafeArea>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              marginTop: 90,
              alignSelf: "center",
              width: 380,
              height: 700,
              borderRadius: 10,
              borderWidth: 5,
              borderColor: "#5E9DE8",
              backgroundColor: "white",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  alignSelf: "flex-end",
                  paddingRight: 20,
                  paddingTop: 20,
                }}
              >
                <MaterialIcons name="cancel" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                marginBottom: 0,
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}
              >
                <Image
                  style={{
                    height: 340,
                    width: 340,
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                  source={{ uri: matchedUserInfo?.photoURL }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                  }}
                >
                  <Text style={styles.font2}>
                    {matchedUserInfo?.displayname},
                  </Text>
                  <Text style={styles.font2}>{matchedUserInfo?.age}</Text>
                  <MaterialIcons
                    name="location-pin"
                    size={30}
                    color="#CA4E32"
                    style={{
                      marginRight: 0,
                      paddingLeft: 55,
                      paddingTop: 20,
                    }}
                  />
                  <Text style={styles.font2}>{matchedUserInfo?.city}</Text>
                </View>

                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.font1}>{matchedUserInfo?.story}</Text>
                </View>

                <View style={{ flexDirection: "row", marginLeft: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    <Entypo
                      name="briefcase"
                      size={24}
                      color="black"
                      style={{ paddingRight: 5 }}
                    />
                    <Text style={styles.font4}>{matchedUserInfo?.job}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 20,
                      marginTop: 20,
                    }}
                  >
                    <FontAwesome5
                      name="ruler-vertical"
                      size={20}
                      color="black"
                      style={{ paddingRight: 10, paddingTop: 2 }}
                    />

                    <Text style={styles.font4}>{matchedUserInfo?.height}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 20,
                    marginBottom: 0,
                  }}
                >
                  <FontAwesome
                    name="search"
                    size={24}
                    color="black"
                    style={{ paddingRight: 5 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.intent}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginTop: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="gender-male-female-variant"
                    size={34}
                    color="black"
                    style={{ paddingRight: 0, paddingTop: 2 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.gender}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <FontAwesome5
                    name="dumbbell"
                    size={24}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 2 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.gym}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <FontAwesome5
                    name="pills"
                    size={24}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 2 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.drugs}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <Entypo
                    name="drink"
                    size={24}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 2 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.drinking}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <MaterialIcons
                    name="child-friendly"
                    size={24}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 2 }}
                  />
                  <Text style={styles.font4}>{matchedUserInfo?.children}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    marginLeft: 10,
                    marginTop: 40,
                    marginBottom: 60,
                  }}
                >
                  <TouchableOpacity
                    style={styles.unmatchButton}
                    onPress={() => onUnmatch(matchDetails.id)}
                  >
                    <Text style={styles.unmatchButtonText}>Unmatch</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.touch1}
          onPress={() =>
            navigation.navigate("Message", {
              matchDetails,
            })
          }
        >
          <Image
            style={styles.image1}
            source={{ uri: matchedUserInfo?.photoURL }}
          />

          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.text1}>{matchedUserInfo?.displayname}</Text>
            <Text style={styles.text11}>
              {lastMessage || "Say hi to your new match!"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 140,
              backgroundColor: "#2C70C0",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              marginLeft: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: "Openbold",
              }}
            >
              View profile
            </Text>
          </TouchableOpacity>
        </View>
      </SafeArea>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",

    padding: 10,
    minHeight: 120,
  },
  unmatchButton: {
    backgroundColor: "red",
    height: 50,
    borderRadius: 20,
    width: 200,
  },
  unmatchButtonText: {
    color: "white",
    fontSize: 23,
    paddingTop: 10,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },

  touch1: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,

    marginLeft: 3,
    marginRight: 3,
    marginTop: 11,
    marginBottom: 1,
    borderRadius: "30%",
  },
  image1: {
    borderRadius: "100%",
    height: 76,
    width: 76,
    marginRight: 4,
  },
  text1: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Openbold",
  },
  text11: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Openregular",
    paddingRight: 70,
  },
  font1: {
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: "Openmedium",
    width: 340,
  },

  font2: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 25,
    fontFamily: "Openextrabold",
    color: "black",
  },
  font3: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    fontSize: 22,
    fontFamily: "Openextrabold",
    color: "black",
  },
  font4: {
    fontSize: 18,
    fontFamily: "Opensemibold",
    color: "black",
  },
});
export default ChatRow;
