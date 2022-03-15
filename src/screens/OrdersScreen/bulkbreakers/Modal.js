import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";

const MessageModal = ({ showModal, message }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal
        isVisible={showModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={100}
      >
        <View style={styles.modalView}>
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
            }}
          >
            You have{" "}
            {message === "Accepted"
              ? "Confirm"
              : message === "Assigned"
              ? "Dispatched"
              : message === "Completed"
              ? "Delivered"
              : message}
          </Text>

          <Text>this order</Text>
        </View>
      </Modal>
    </View>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    height: 120,
    width: 250,
    borderRadius: 6,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
  },
});
