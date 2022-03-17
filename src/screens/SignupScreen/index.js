import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Platform, View, Text } from "react-native";
import { LoginView } from "ad-b2c-react-native";
// import * as SecureStore from "expo-secure-store";
import appTheme from "../../constants/theme";
import { register, clearErrors } from "../../redux/actions/authActions";
import Loading from "../../components/Loaders/Loading";
import * as SecureStore from "../../../SecureStore";

const SignupScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { loading, error } = authState;

  const onLogin = () => {
    dispatch(register(navigation));
  };

  const onFail = (reason) => {
    console.log("failed");
    console.log(reason);
  };

  const spinner = () => {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 10000);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      {error && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: appTheme.COLORS.white,
            height: 100,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontFamily: "Gilroy-Medium",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        </View>
      )}
      <LoginView
        appId="3eef02d6-eac1-4803-8cf8-3af748c9be16"
        redirectURI="https://dms20prod.b2clogin.com/oauth2/nativeclient"
        tenant="dms20prod"
        loginPolicy="B2C_1_dms_phone_signup_signin"
        secureStore={SecureStore}
        renderLoading={spinner}
        onSuccess={onLogin}
        onFail={onFail}
      />
    </View>
  );
};

export default SignupScreen;

// import React from "react";
// import { connect } from "react-redux";
// import { LoginView } from "ad-b2c-react-native";
// import {
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   View,
//   Image,
// } from "react-native";
// import { images } from "../../constants";
// import appTheme from "../../constants/theme";
// import { register } from "../../redux/actions/authActions";
// import * as SecureStore from "../../../SecureStore";

// // import Loading from "../../components/Loading";

// class SignupScreen extends React.PureComponent {
//   static navigationOptions = { header: null };

//   constructor(props) {
//     super(props);
//     this.onLogin = this.onLogin.bind(this);
//     this.onFail = this.onFail.bind(this);
//     this.spinner = this.spinner.bind(this);
//   }

//   onLogin = async () => {
//     const { navigation } = this.props;
//     this.props.register(navigation);
//   };
//   onFail = (reason) => {
//     console.log("failed");
//   };

//   spinner = () => {
//     return (
//       <ActivityIndicator
//         color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
//         animating={true}
//         size="large"
//       />
//     );
//   };

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <LoginView
//           appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
//           redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
//           tenant="devdms2"
//           loginPolicy="B2C_1_dms_mobile_signup_signin"
//           secureStore={SecureStore}
//           renderLoading={this.spinner}
//           onSuccess={this.onLogin}
//           onFail={this.onFail}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   user: state.user,
// });

// export default connect(mapStateToProps, { register })(SignupScreen);
