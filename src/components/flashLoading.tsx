import React, { FC } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";

interface FlashLoadingProps {
  show: boolean;
  text?: string;
}

const FlashLoading: FC<FlashLoadingProps> = ({ show, text = "loading..." }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={styles.view}>
        <Text
          style={[
            globalStyles.text,
            globalStyles.fontMedium,
            {
              backgroundColor: "#333",
              padding: 15,
              borderRadius: 10,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
    zIndex: 1000,
  },
});

export default FlashLoading;
