import React, { useState, useEffect, FC, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  TouchableHighlight,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Modalize } from "react-native-modalize";

// redux
import { useDispatch, useSelector } from "react-redux";
import { initialData } from "../redux/action";

// components
import EmptyList from "../components/emptyAnimeList";
import FlashLoading from "../components/flashLoading";
import Header from "../components/header";
import HomeOption from "../components/homeOptions";

// lib
import flashMessage from "../lib/flashMessage";

// styles
import { globalStyles, SPACING } from "../styles";

interface HomeProps {
  navigation: any;
}

interface RenderItemProps {
  item: { mal_id: string; _id: string; title: string; image_url: string };
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefresh] = useState<boolean>(false);
  const [startingLoading, setStartingLoading] = useState<boolean>(true);
  const [homeOptions, setHomeOptions] = useState({
    id: "",
    title: "",
  });
  const modalizeRef = useRef<Modalize>(null);

  const { username } = useSelector((s: any) => s.user);
  const DATAS = useSelector((s: any) => s.DATA);

  useEffect(() => {
    fetchData();
  }, []);

  // fetching data from server
  const fetchData = async () => {
    setRefresh(true);
    try {
      const jat = await AsyncStorage.getItem("jat");

      const { data } = await axios.get("/anime", {
        headers: {
          hauth: jat,
        },
      });
      dispatch(initialData(data.anime));
    } catch (err) {
      flashMessage("unable to connect to the server try again!");
    }
    setStartingLoading(false);
    setRefresh(false);
  };

  const openMenu = (item: any) => {
    setHomeOptions({
      id: item._id,
      title: item.title,
    });
    modalizeRef.current?.open();
  };

  const closeMenu = () => {
    modalizeRef.current?.close();
  };

  // Header
  const RenderItemHeader: FC = () => (
    <View style={styles.box_container}>
      <View
        style={{
          width: "50%",
          height: "100%",
          borderColor: "#4F74FF",
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontBold,
            { fontSize: 20, letterSpacing: 0.5 },
          ]}
        >
          What's Up!
        </Text>
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontMedium,
            { fontSize: 18, textTransform: "capitalize" },
          ]}
          numberOfLines={1}
        >
          {username}
        </Text>
      </View>
      <View style={styles.box}>
        <Text
          style={[globalStyles.text, globalStyles.fontBold, { fontSize: 16 }]}
        >
          Total Anime
        </Text>
        <Text
          style={[globalStyles.text, globalStyles.fontBold, { fontSize: 30 }]}
        >
          {DATAS.total_anime}
        </Text>
      </View>
    </View>
  );

  // anime list
  const RenderItem: FC<RenderItemProps> = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate("AnimeProfile", { id: item.mal_id })}
        onLongPress={() => openMenu(item)}
      >
        <View style={styles.lists}>
          <View>
            <Image
              style={{ width: 60, height: 60, borderRadius: 100 }}
              source={{
                uri: `${item.image_url}`,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                {
                  marginLeft: 15,
                  fontSize: 17,
                },
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={[
        globalStyles.statusBarHeight,
        globalStyles.background,
        styles.container,
      ]}
    >
      {/* header */}
      <Header />

      {startingLoading ? (
        <FlashLoading
          show={startingLoading}
          text="connecting to the server..."
        />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              data={DATAS.data}
              renderItem={RenderItem}
              ListHeaderComponent={RenderItemHeader}
              ListEmptyComponent={EmptyList}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={fetchData}
                  progressBackgroundColor="#2c2c2c"
                  colors={["#4F74FF", "#CC0022"]}
                />
              }
            />
          </View>
          <Modalize
            ref={modalizeRef}
            handleStyle={{ backgroundColor: "#fafafa" }}
            modalStyle={{ backgroundColor: "#222831" }}
            adjustToContentHeight={true}
          >
            <HomeOption options={homeOptions} onDimiss={closeMenu} />
          </Modalize>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  box_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 35,
    height: 100,
  },
  box: {
    backgroundColor: "#4F74FF",
    width: "45%",
    height: "100%",
    padding: SPACING,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lists: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: "#222831",
    borderRadius: SPACING,
  },
});

export default Home;
