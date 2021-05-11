import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles";

const Empty: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text, globalStyles.fontMedium, styles.text]}>
        Nothing is here yet!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default Empty;
