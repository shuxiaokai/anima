import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { FC } from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";

// redux
import { useDispatch } from "react-redux";
import { delete_date } from "../redux/action";

// lib
import flashMessage from "../lib/flashMessage";

// styles
import { globalStyles } from "../styles";
import ExpoClipboard from "expo-clipboard";

interface HomeOptionProps {
  options: { id: string; title: string };
  onDimiss: () => void;
}

const HomeOption: FC<HomeOptionProps> = ({ options, onDimiss }) => {
  const dispatch = useDispatch();

  const deleteAnime = async (id: string) => {
    try {
      dispatch(delete_date(id));
      const jat = await AsyncStorage.getItem("jat");
      await axios.delete(`/anime/${id}`, {
        headers: { hauth: jat },
      });
    } catch (err) {
      flashMessage("Something went wrong while deleting!");
    }
  };

  const copyToClipboard = (name: string) => {
    ExpoClipboard.setString(name);
    flashMessage("copied");
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.options}
        onPress={() => {
          copyToClipboard(options.title);
          onDimiss();
        }}
        underlayColor="#222831"
        activeOpacity={0.5}
      >
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontMedium,
            styles.optionText,
          ]}
        >
          Copy name
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.options}
        onPress={() => {
          deleteAnime(options.id);
          onDimiss();
        }}
        underlayColor="#222831"
        activeOpacity={0.5}
      >
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontMedium,
            styles.optionText,
          ]}
        >
          Delete
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.options}
        underlayColor="#222831"
        activeOpacity={0.5}
        onPress={onDimiss}
      >
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontMedium,
            styles.optionText,
          ]}
        >
          Close
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  options: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
  },
});

export default HomeOption;
