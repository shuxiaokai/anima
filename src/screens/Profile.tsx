import React, { FC, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// styles
import { globalStyles, SPACING } from "../styles";

// icons
import { Ionicons } from "@expo/vector-icons";

// components
import DeleteConfirmation from "../components/deleteConfirmation";

// redux
import { useSelector, useDispatch } from "react-redux";
import { notauth } from "../redux/action";
import flashMessage from "../lib/flashMessage";

interface ProfileProps {
  navigation: any;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const user = useSelector((s: any) => s.user);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const deleteAccount = async () => {
    try {
      const jat = await AsyncStorage.getItem("jat");
      await axios.delete("/account/delete", {
        headers: { hauth: jat },
      });
      await AsyncStorage.removeItem("jat");
      setModalVisible(false);
      dispatch(notauth());
    } catch (err) {
      flashMessage("unable to delete account try again!");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("jat");
    dispatch(notauth());
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          globalStyles.background,
          globalStyles.statusBarHeight,
        ]}
      >
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={30} color="#fafafa" />
        </TouchableHighlight>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          </View>
          <View>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontBold,
                { fontSize: 20 },
              ]}
            >
              {user.username}
            </Text>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontMedium,
                { fontSize: 15 },
              ]}
            >
              {user.email}
            </Text>
          </View>
        </View>

        {/* profile options */}
        <View style={styles.profileOptions}>
          <TouchableHighlight
            style={[styles.btn, { backgroundColor: "#222831" }]}
            onPress={logout}
          >
            <Text
              style={[
                globalStyles.text,
                styles.btnText,
                globalStyles.fontMedium,
              ]}
            >
              Logout
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btn, { marginTop: 10, backgroundColor: "#BB2020" }]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                globalStyles.text,
                styles.btnText,
                globalStyles.fontMedium,
              ]}
            >
              Delete an account
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <DeleteConfirmation
        visible={modalVisible}
        close={closeModal}
        deleteAccount={deleteAccount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  card: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#06111C",
    marginTop: SPACING,
    minHeight: 150,
    borderRadius: 20,
  },
  imageContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
  },
  profileOptions: {
    marginTop: SPACING,
  },
  btn: {
    padding: 8,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
