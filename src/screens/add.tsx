import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import axios from "axios";

// icons
import { Ionicons, Feather } from "@expo/vector-icons";

// styles
import { globalStyles, SPACING } from "../styles";

// redux
import { useDispatch, useSelector } from "react-redux";

// components
import Loading from "../components/loading";
import FlashLoading from "../components/flashLoading";

// util
import { addAnime } from "../utils/addAnime";
import { isAddedData } from "../utils/isAddedData";

interface AddProps {
  navigation: any;
}

interface RenderItemProps {
  item: any;
}

const Add: FC<AddProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>("");
  const [DATA, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [customError, setCustomError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const dispatch = useDispatch();

  const DATAS = useSelector((s: any) => s.DATA);

  const searchAnime = async () => {
    if (search) {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.jikan.moe/v3/search/anime?q=${search + " "}&page=1`
        );
        setData([...data.results]);
        setCustomError(false);
      } catch (err) {
        setCustomError(true);
      }
      setLoading(false);
    }
  };

  const textChange = (text: string) => {
    setSearch(text);
    if (text.length > 0) setShowClearBtn(true);
    else setShowClearBtn(false);
  };

  const RenderItem: FC<RenderItemProps> = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("AnimeProfile", {
            id: item.mal_id,
          })
        }
      >
        <View style={styles.lists}>
          <View>
            <Image
              style={{ width: 60, height: 60, borderRadius: 50 }}
              source={{
                uri: `${item.image_url}`,
              }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                {
                  marginLeft: 20,
                  fontSize: 17,
                  width: "80%",
                },
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <View style={{ marginLeft: "auto" }}>
              {isAddedData(DATAS, item.title) ? (
                <Pressable
                  onPress={() =>
                    addAnime(
                      item.title,
                      item.image_url,
                      item.mal_id,
                      setShow,
                      dispatch
                    )
                  }
                >
                  <Feather name="plus-circle" size={25} color="#fafafa" />
                </Pressable>
              ) : (
                <Feather name="check-circle" size={25} color="#fafafa" />
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <View
        style={[
          globalStyles.statusBarHeight,
          globalStyles.background,
          styles.container,
        ]}
      >
        {/* icons */}
        <TouchableHighlight
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="chevron-back-sharp" size={30} color="#fafafa" />
        </TouchableHighlight>

        {/* input search anime */}
        <View>
          <Text
            style={[
              globalStyles.text,
              globalStyles.fontBold,
              {
                fontSize: 22,
                margin: 10,
                textTransform: "capitalize",
              },
            ]}
          >
            search anime here!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[globalStyles.fontMedium, styles.input]}
              onChangeText={textChange}
              value={search}
              placeholder="e.g. naruto"
              placeholderTextColor="rgba(255,255,255,0.6)"
              blurOnSubmit={true}
              onSubmitEditing={searchAnime}
              selectionColor="rgba(255,255,255,0.5)"
            />
            {showClearBtn && (
              <Pressable
                onPress={() => {
                  setSearch("");
                  setShowClearBtn(false);
                }}
              >
                <Feather name="x" size={22} color="#fafafa" />
              </Pressable>
            )}
          </View>
        </View>
        {loading && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Loading />
          </View>
        )}
        {customError ? (
          <View style={styles.error}>
            <Text
              style={[
                globalStyles.fontMedium,
                { color: "#ffe5d4", textAlign: "center" },
              ]}
            >
              404! Not Found!
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: 20, flex: 1 }}>
            <FlatList
              data={DATA}
              renderItem={RenderItem}
              keyExtractor={(item) => `${item.mal_id}`}
            />
          </View>
        )}
      </View>
      <FlashLoading show={show} text="adding.." />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#222831",
    alignItems: "center",
    borderRadius: SPACING,
    overflow: "hidden",
    paddingHorizontal: SPACING,
  },
  input: {
    color: "#fafafa",
    height: 50,
    fontSize: 13,
    flex: 1,
  },
  lists: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: "#222831",
    borderRadius: SPACING,
  },
  error: {
    height: 50,
    backgroundColor: "#e40017",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: SPACING,
  },
});

export default Add;
