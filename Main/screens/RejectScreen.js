import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { SafeArea } from "../../utility/safe-area";
import { TouchableOpacity, View, Text, Image } from "react-native";

import Swiper from "react-native-deck-swiper";
import { StyleSheet } from "react-native";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { auth, db } from "../../config/firebase";
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
  Query,
} from "firebase/firestore";
import generateId from "../../lib/generateid";
import { async } from "@firebase/util";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const RejectScreen = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [url, setUrl] = useState();
  const swipeRef = useRef(null);

  const [fontsLoaded] = useFonts({
    Openbold: require("../component/fonts/OpenSans-Bold.ttf"),
    Openregular: require("../component/fonts/OpenSans-Regular.ttf"),
    Openmedium: require("../component/fonts/OpenSans-Medium.ttf"),
    Opensemibold: require("../component/fonts/OpenSans-SemiBold.ttf"),
    Openextrabold: require("../component/fonts/OpenSans-ExtraBold.ttf"),
    Rock: require("../component/fonts/RockSalt-Regular.ttf"),
  });

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "Users", auth.currentUser.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Profile");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "Users", auth.currentUser.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "Users", auth.currentUser.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      const currentUser = await getDoc(
        doc(collection(db, "Users"), auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(
        query(
          collection(db, "Users"),
          where("gender", "==", currentUser.data().seeking),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        )
      );

      const usersWithPasses = [];

      querySnapshot.forEach(async (doc) => {
        const swipesSnapshot = await getDocs(collection(doc.ref, "passes"));
        swipesSnapshot.forEach((swipeDoc) => {
          if (swipeDoc.id === auth.currentUser.uid) {
            const user = {
              id: doc.id,
              ...doc.data(),
            };
            usersWithPasses.push(user);

            setProfiles(usersWithPasses);
            console.log(usersWithPasses);
          }
        });
      });

      return usersWithPasses;
    };

    console.log(auth.currentUser.uid);
    fetchCards();

    return unsub;
  }, [db]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeArea style={styles.safe}>
      <View style={styles.view1}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.view2}>
                <Image style={styles.photo} source={{ uri: card.photoURL }} />

                <View style={styles.view3}>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                      name="hashtag"
                      size={22}
                      color="#E8592B"
                      style={{
                        marginRight: 8,

                        paddingTop: 6,
                      }}
                    />
                    <Text style={styles.font1}>{card.displayname}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <MaterialIcons
                      name="cake"
                      size={22}
                      color="#E8592B"
                      style={{
                        marginRight: 8,

                        paddingTop: 4,
                      }}
                    />
                    <Text style={styles.font2}>{card.age}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Entypo
                      name="location-pin"
                      size={22}
                      color="#E8592B"
                      style={{
                        marginRight: 8,

                        paddingTop: 5,
                      }}
                    />
                    <Text style={styles.font2}>{card.states}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="human-male-height"
                      size={22}
                      color="#E8592B"
                      style={{
                        marginRight: 8,

                        paddingTop: 5,
                      }}
                    />
                    <Text style={styles.font2}>{card.height}</Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="genderless"
                      size={22}
                      color="#E8592B"
                      style={{
                        marginRight: 8,

                        paddingTop: 5,
                      }}
                    />
                    <Text style={styles.font2}>{card.gender}</Text>
                  </View>

                  <View style={{ marginTop: 5, marginLeft: 8, width: 340 }}>
                    <Text style={styles.font3}>{card.story}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.view5}>
                <Text
                  style={{
                    fontFamily: "Opensemibold",
                    fontSize: 32,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Zero rejections,keep swiping!
                </Text>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-broken"
                    size={92}
                    color="red"
                  />
                </View>
              </View>
            )
          }
        />
      </View>
    </SafeArea>
  );
};

export default RejectScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  view1: {
    flex: 1,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderBottomRadius: 40,
  },
  view2: {
    backgroundColor: "white",
    height: "75%",
    borderRadius: 0,
    position: "relative",
  },
  view3: {
    backgroundColor: "white",
    height: "40%",
    width: "100%",
    position: "absolute",
    bottom: 0,

    justifyContent: "flex-start",

    alignItems: "flex-start",
    paddingLeft: 20,
  },
  view4: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 10,
  },
  photo: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    top: 0,
  },
  font1: {
    fontSize: 30,
    paddingTop: 10,
    fontFamily: "Openbold",
  },
  font1: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: "Openbold",
  },
  font2: {
    fontSize: 18,
    paddingTop: 2,
    fontFamily: "Openmedium",
    marginBottom: 1,
    color: "#423F3F",
  },
  font3: {
    fontSize: 18,
    paddingTop: 2,
    fontFamily: "Openregular",
    marginBottom: 1,
    color: "#423F3F",
  },
  font4: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: "Openbold",
    marginBottom: 5,
    width: 320,
    color: "black",
  },
  touch: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50",
    width: 70,
    height: 70,
    backgroundColor: "#46B1B2",
  },
  touch1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50",
    width: 70,
    height: 70,
    backgroundColor: "#CFFEFF",
  },
  view5: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
    backgroundColor: "white",
  },
  viewImage: {
    height: "100%",
    height: 20,
  },
  viewText: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
