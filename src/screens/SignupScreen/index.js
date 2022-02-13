import React from "react";
import { connect } from "react-redux";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, ActivityIndicator } from "react-native";

import { register } from "../../redux/actions/authActions";
import appTheme from "../../constants/theme";
import Loading from "../../components/Loading";
import { Routes } from "../../navigation/Routes";

class SignupScreen extends React.PureComponent {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onFail = this.onFail.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  onLogin = async () => {
    const { navigation } = this.props;
    this.props.register(navigation);
  };
  onFail = (reason) => {
    console.log("failed");
  };

  spinner = () => {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LoginView
          // appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
          // redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
          // tenant="devdms2"
          // loginPolicy="B2C_1_dms_mobile_signup_signin"
          appId="ba87f4a6-b062-4aaa-b625-97ec904bb1e3"
          redirectURI="https://opeyemitech.b2clogin.com/oauth2/nativeclient"
          tenant="opeyemitech"
          loginPolicy="B2C_1_Signup_SIgnin"
          secureStore={SecureStore}
          renderLoading={this.spinner}
          onSuccess={this.onLogin}
          onFail={this.onFail}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { register })(SignupScreen);
