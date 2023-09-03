import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
//import { SafeArea } from "../../utility/safe-area";
import { TouchableOpacity, View, Text, Image } from "react-native";

import Swiper from "react-native-deck-swiper";
import { StyleSheet } from "react-native";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  Octicons,
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
} from "firebase/firestore";
import generateId from "../../lib/generateid";
import { useFonts } from "expo-font";

const HomeScreen = () => {
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
    Rocksalt: require("../component/fonts/RockSalt-Regular.ttf"),
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
      //const seeker = currentUser.data().seeking;

      //console.log(seeker);

      unsub = onSnapshot(
        query(
          collection(db, "Users"),
          where("gender", "==", currentUser.data().seeking),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== auth.currentUser.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    console.log(auth.currentUser.uid);
    fetchCards();

    return unsub;
  }, [db]);

  if (!fontsLoaded) {
    return null;
  }

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped PASS on ${userSwiped.job}`);

    setDoc(
      doc(db, "Users", auth.currentUser.uid, "passes", userSwiped.id),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "Users", auth.currentUser.uid))
    ).data();

    getDoc(
      doc(db, "Users", userSwiped.id, "swipes", auth.currentUser.uid)
    ).then((DocumentSnapshot) => {
      if (DocumentSnapshot.exists()) {
        console.log(`Hooray you matched with ${userSwiped.displayname}`);

        setDoc(
          doc(db, "Users", auth.currentUser.uid, "swipes", userSwiped.id),
          userSwiped
        );

        //create a match
        setDoc(
          doc(db, "matches", generateId(auth.currentUser.uid, userSwiped.id)),
          {
            users: {
              [auth.currentUser.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [auth.currentUser.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          }
        );

        navigation.navigate("Match", {
          loggedInProfile,
          userSwiped,
        });
      } else {
        console.log(`you swipe on ${userSwiped.job}`);

        setDoc(
          doc(db, "Users", auth.currentUser.uid, "swipes", userSwiped.id),
          userSwiped
        );
      }
    });
  };

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
          onSwipedLeft={(cardIndex) => {
            console.log("SWIPE PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("SWIPE MATCH");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "green",
                },
              },
            },
          }}
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
                <Text style={styles.view4}>No more profiles</Text>

                <Image
                  style={styles.viewImage}
                  height={100}
                  width={100}
                  source={{ uri: url }}
                ></Image>
              </View>
            )
          }
        />
      </View>
      <View style={styles.view4}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={styles.touch1}
        >
          <Entypo name="cross" size={60} color="#C22929" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={styles.touch}
        >
          <AntDesign name="heart" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  view1: {
    flex: 1,
    margin: 6,
    marginTop: -20,
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
    marginBottom: 25,
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
    backgroundColor: "#2C70C0",
  },
  touch1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50",
    width: 70,
    height: 70,
    backgroundColor: "#8BB6E8",
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
