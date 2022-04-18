import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import appTheme from "../../../constants/theme";

const ReceivedOrderFooter = ({ updateOrderStatus, loading, singleOrder }) => {
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 20,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 15,
      }}
    >
      {singleOrder?.status === "Placed" && (
        <>
          <TouchableOpacity
            onPress={() => updateOrderStatus("Rejected")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 4,
              flex: 1,
              marginRight: 20,
              borderWidth: 1,
              borderColor: appTheme.COLORS.borderGRey1,
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={
                  Platform.OS === "android"
                    ? appTheme.COLORS.mainRed
                    : undefined
                }
                animating={loading}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: appTheme.COLORS.black,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 17,
                }}
              >
                Reject Order
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => updateOrderStatus("Accepted")}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 4,
              flex: 1,
              elevation: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={
                  Platform.OS === "android" ? appTheme.COLORS.white : undefined
                }
                animating={loading}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 17,
                }}
              >
                Accept Order
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* confirm */}

      {singleOrder?.status === "Accepted" && (
        <>
          <TouchableOpacity
            onPress={() => updateOrderStatus("Assigned")}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 4,
              flex: 1,
              elevation: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={
                  Platform.OS === "android" ? appTheme.COLORS.white : undefined
                }
                animating={loading}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 17,
                }}
              >
                Mark as Dispatched
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* assigned */}

      {singleOrder?.status === "Assigned" && (
        <>
          <TouchableOpacity
            onPress={() => updateOrderStatus("Completed")}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 4,
              flex: 1,
              elevation: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator
                color={
                  Platform.OS === "android" ? appTheme.COLORS.white : undefined
                }
                animating={loading}
                size="large"
              />
            ) : (
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 17,
                }}
              >
                Mark as Delivered
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* delivered */}

      {singleOrder?.status === "Completed" && <></>}
    </View>
  );
};

export default ReceivedOrderFooter;

const styles = StyleSheet.create({});
