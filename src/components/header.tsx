import React, { FC } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// icons
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// styles
import { globalStyles } from "../styles";

// redux
import { useDispatch } from "react-redux";
import { notauth } from "../redux/action";

const Header: FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("jat");
      dispatch(notauth());
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.header}>
      <Text
        style={[
          globalStyles.text,
          globalStyles.fontBold,
          { fontSize: 25, letterSpacing: 1 },
        ]}
      >
        anima.
      </Text>
      <View style={styles.headerIcon}>
        <TouchableHighlight
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Add")}
        >
          <Feather name="search" size={22} color="#fafafa" />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 20 }}
        >
          <MaterialCommunityIcons
            name="face-profile"
            size={24}
            color="#fafafa"
          />
        </TouchableHighlight>

        <TouchableHighlight onPress={logout}>
          <Feather name="log-out" size={22} color="#fafafa" />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
});

export default Header;
