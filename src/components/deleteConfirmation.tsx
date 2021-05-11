import React, { FC } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";

interface DeleteConfirmationProps {
  visible: boolean;
  close: () => void;
  deleteAccount: () => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  visible,
  close,
  deleteAccount,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.box}>
        <View style={styles.card}>
          <Text
            style={[
              globalStyles.text,
              globalStyles.fontMedium,
              { fontSize: 18 },
            ]}
          >
            Are you sure that you want to delete?
          </Text>
          <View style={styles.btn_container}>
            <Pressable
              onPress={close}
              style={[
                styles.btn,
                { backgroundColor: "#283951", marginRight: 10 },
              ]}
            >
              <Text style={[globalStyles.fontMedium, globalStyles.text]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={deleteAccount}
              style={[styles.btn, { backgroundColor: "#C0070B" }]}
            >
              <Text style={[globalStyles.fontMedium, globalStyles.text]}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  card: {
    backgroundColor: "#2c2c2c",
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  btn_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
  },
});

export default DeleteConfirmation;
