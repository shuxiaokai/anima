import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const globalStyles = StyleSheet.create({
  text: {
    color: "#fafafa",
  },
  fontBold: {
    fontFamily: "PoppinsBold",
  },
  fontMedium: {
    fontFamily: "PoppinsMedium",
  },
  statusBarHeight: { paddingTop: Constants.statusBarHeight + 30 },
  background: {
    backgroundColor: "#05050C",
  },
});

export const SPACING = 20;
