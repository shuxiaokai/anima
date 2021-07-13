import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import axios from "axios";

// components
import FlashLoading from "../components/flashLoading";
import Loading from "../components/loading";

// lib
import flashMessage from "../lib/flashMessage";
import { copyToClipboard } from "../lib/clipboard";

// redux
import { useDispatch, useSelector } from "react-redux";

// styles
import { globalStyles, SPACING } from "../styles";

// icons
import { Ionicons } from "@expo/vector-icons";

// util
import { addAnime } from "../utils/addAnime";
import { isAddedData } from "../utils/isAddedData";

const { width } = Dimensions.get("window");

interface AnimeProfileProps {
  navigation: any;
  route: any;
}

const AnimeProfile: FC<AnimeProfileProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>(route.params.id);
  const [data, setData] = useState<any>();
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const DATA = useSelector((s: any) => s.DATA);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://api.jikan.moe/v3/anime/${id}`
        );
        setData({
          title: data.title,
          image_url: data.image_url,
          studio: data.studios[0] ? data.studios[0].name : "N/A",
          rating: data.score,
          status: data.status,
          tags: data.genres,
          desc: data.synopsis,
          total_ep: data.episodes ? data.episodes : "N/A",
          type: data.type,
          premiered: data.premiered ? data.premiered : "N/A",
          release_data: data.aired.string,
          sequel: data.related.Sequel ? data.related.Sequel[0] : undefined,
          prequel: data.related.Prequel ? data.related.Prequel[0] : undefined,
        });
        setLoading(false);
      } catch (err) {
        flashMessage("something went wrong try again!");
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          globalStyles.background,
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Loading />
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          globalStyles.statusBarHeight,
          globalStyles.background,
          styles.container,
        ]}
      >
        {/* header */}
        <View style={styles.header}>
          <TouchableHighlight onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={30} color="#fafafa" />
          </TouchableHighlight>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "auto",
              height: "100%",
            }}
          >
            {isAddedData(DATA, data.title) && (
              <TouchableHighlight
                onPress={() =>
                  addAnime(data.title, data.image_url, id, setShow, dispatch)
                }
                style={{ marginRight: 20 }}
              >
                <Ionicons name="add-circle" size={32} color="#fff" />
              </TouchableHighlight>
            )}

            <TouchableHighlight onPress={() => copyToClipboard(data.title)}>
              <Ionicons name="md-copy" size={26} color="#fafafa" />
            </TouchableHighlight>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* titile */}
          <Text
            style={[globalStyles.text, globalStyles.fontBold, styles.title]}
          >
            {data.title}
          </Text>

          {/* cover image */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              style={styles.image}
              source={{
                uri: `${data.image_url}`,
              }}
              resizeMode="contain"
            />
          </View>

          {/* info */}
          <View style={styles.info}>
            <View>
              <Text style={[globalStyles.fontMedium, styles.label]}>
                Studios
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.fontMedium,
                  styles.flexiableText,
                  { textAlign: "center" },
                ]}
              >
                {data.studio}
              </Text>
            </View>
            <View>
              <Text style={[globalStyles.fontMedium, styles.label]}>
                Rating
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.fontMedium,
                  styles.flexiableText,
                  { textAlign: "center" },
                ]}
              >
                {data.rating ? data.rating : "N/A"}
              </Text>
            </View>
            <View>
              <Text style={[globalStyles.fontMedium, styles.label]}>
                Status
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.fontMedium,
                  styles.flexiableText,
                  { textAlign: "center" },
                ]}
              >
                {data.status}
              </Text>
            </View>
          </View>

          {/* type */}
          <View style={styles.type}>
            <View>
              <Text
                style={[
                  globalStyles.fontMedium,
                  globalStyles.text,
                  styles.flexiableText,
                ]}
              >
                Type: {data.type}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  globalStyles.fontMedium,
                  globalStyles.text,
                  styles.flexiableText,
                ]}
              >
                Premiered: {data.premiered}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  globalStyles.fontMedium,
                  globalStyles.text,
                  styles.flexiableText,
                ]}
              >
                Total Episodes: {data.total_ep}
              </Text>
            </View>
          </View>

          {/* release data  */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                { fontSize: 15 },
              ]}
            >
              Released : {data.release_data}
            </Text>
          </View>

          {/* tags */}
          <View>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                { fontSize: 20 },
              ]}
            >
              Genres :-
            </Text>
            <View style={styles.tags}>
              {data.tags.map((d: any, index: number) => (
                <Text
                  style={[globalStyles.fontMedium, styles.tagName]}
                  key={index}
                >
                  {d.name}
                </Text>
              ))}
            </View>
          </View>

          {/* description */}
          <View style={{ marginTop: 5 }}>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                { fontSize: 20, marginBottom: 10 },
              ]}
            >
              Synopsis :-
            </Text>
            <Text style={[globalStyles.text, styles.desc]}>
              {data.desc ? data.desc : "N/A"}
            </Text>
          </View>

          {/* releted section */}
          {(data.prequel || data.sequel) && (
            <View style={styles.related}>
              <Text
                style={[
                  globalStyles.text,
                  globalStyles.fontMedium,
                  { fontSize: 20, marginBottom: 10 },
                ]}
              >
                Related Anime :-
              </Text>
              {data.prequel && (
                <Pressable onPress={() => setId(data.prequel.mal_id)}>
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      styles.related_text,
                    ]}
                  >
                    Prequel : {data.prequel.name}
                  </Text>
                </Pressable>
              )}
              {data.sequel && (
                <Pressable onPress={() => setId(data.sequel.mal_id)}>
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      styles.related_text,
                      { marginBottom: 5 },
                    ]}
                  >
                    Sequel : {data.sequel.name}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {/* footer */}
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={[globalStyles.fontMedium, styles.footer]}>
              All this data are from myanimelist.net
            </Text>
          </View>
        </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 4,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginTop: 30,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 15,
    textAlign: "center",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 20,
  },
  tagName: {
    margin: 1,
    color: "#eee",
    marginRight: 10,
  },
  desc: {
    lineHeight: 27,
    fontSize: 15,
    letterSpacing: 0.7,
  },
  footer: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
  type: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  flexiableText: {
    fontSize: width / 30,
  },
  related: {
    marginTop: 20,
  },
  related_text: {
    fontSize: 15,
  },
});

export default AnimeProfile;
