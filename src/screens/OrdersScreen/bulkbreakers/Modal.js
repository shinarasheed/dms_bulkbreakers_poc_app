import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import appTheme from "../../../constants/theme";

const MessageModal = ({ showModal, message }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        isVisible={showModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={2000}
        animationOutTiming={100}
      >
        <View style={styles.modalView}>
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: 18,
              color: appTheme.COLORS.mainRed,
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

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: 18,
              color: appTheme.COLORS.mainRed,
            }}
          >
            this order
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    height: 180,
    width: 300,
    borderRadius: 6,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    elevation: 5,
    alignSelf: "center",
  },
});
