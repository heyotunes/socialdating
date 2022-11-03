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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [url, setUrl] = useState();
  const swipeRef = useRef(null);

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

      unsub = onSnapshot(
        query(
          collection(db, "Users"),
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
    console.log(auth.currentUser.job);
    fetchCards();
    return unsub;
  }, [db]);

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
        console.log(`Hooray you matched with ${userSwiped.job}`);

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
                  <View>
                    <Text style={styles.font1}>{card.displayname}</Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                      }}
                    >
                      <MaterialIcons
                        name="work"
                        size={24}
                        color="#8A2F2F"
                        style={{ marginRight: 4 }}
                      />
                      <Text>{card.job}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <FontAwesome
                        name="flag"
                        size={24}
                        color="#8A2F2F"
                        style={{ marginRight: 4 }}
                      />
                      <Text>{card.country}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        textAlign: "right",
                        width: 250,
                        top: 1,
                      }}
                    >
                      <Entypo
                        name="open-book"
                        size={24}
                        color="#8A2F2F"
                        style={{ marginRight: 4 }}
                      />
                      <Text>{card.story}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                      name="birthday-cake"
                      size={24}
                      color="#8A2F2F"
                      style={{ marginTop: 5, marginRight: 4 }}
                    />
                    <Text style={styles.font2}>{card.age}</Text>
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
          <Entypo name="cross" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={styles.touch}
        >
          <AntDesign name="heart" size={30} color="white" />
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
    height: "20%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  view4: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 10,
  },
  photo: {
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    top: 0,
  },
  font1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  font2: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  touch: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50",
    width: 70,
    height: 70,
    backgroundColor: "#8A2F2F",
  },
  touch1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50",
    width: 70,
    height: 70,
    backgroundColor: "#939393",
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
