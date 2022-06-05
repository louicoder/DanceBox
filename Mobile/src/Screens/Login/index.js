import React from 'react';
import { View, Text, Dimensions, Pressable, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input, Password, Buton, Typo, LoginReg } from '../../Components';
// import Icon from '../../assets/blob.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncStorage, showAlert, validateEmail, ValidateEmail } from '../../Utils/HelperFunctions';
import { HEIGHT, THEME_COLOR, WIDTH } from '../../Utils/Constants';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// 635333492136-j1lfb3u3m52rfh1d30gqtfu8p4cnbj1q.apps.googleusercontent.com
GoogleSignin.configure({
  webClientId: '635333492136-j1lfb3u3m52rfh1d30gqtfu8p4cnbj1q.apps.googleusercontent.com' // client ID of type WEB for your server(needed to verify user ID and offline access)
});

const { height, width } = Dimensions.get('window');
const Login = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    email: 'musanje2015@gmail.com',
    password: 'password',
    passVisible: false
  });
  const loading = useSelector((state) => state.loading.effects.Account);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // login();
    getAsyncStorage('user', (res) => console.log('STorage key', res));
  }, []);

  const googleSignin = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      // const info = await GoogleSignin.signIn();
      // console.warn({ userInfo: info });
      // setUserInfo(info);
      const { idToken, ...rest } = await GoogleSignin.signIn();

      // console.log('REsuer', rest);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('ERror', 'SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // console.log('ERror', 'IN_PROGRESS');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // console.log('ERror', 'PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // console.log('ERror', 'Other error');
        // some other error happened
      }
    }
  };

  const login = () => {
    const { email, password } = state;
    if (!email) return showAlert('Email missing', 'Password is required to continue, try again', '', 'top');
    if (!password) return showAlert('Password missing', 'Password is required to continue, try again', '', 'top');
    if (!validateEmail(email))
      return showAlert('Invalid email', 'Please enter a valid email in order to continue', '', 'top');

    dispatch.Account.login({
      email,
      password,
      callback: (res) => {
        // console.log('RES from login', res);
        if (!res.success) return showAlert('Error logging in', res.result);
        return navigation.navigate('Main', { screen: 'Home' });
      }
    });
  };
  // const setter = React.useCallback(() => {

  // }, [setState])

  return (
    <View style={{ flex: 1, backgroundColor: THEME_COLOR }}>
      <StatusBar backgroundColor={THEME_COLOR} />

      <LoginReg
        optionOnPress={() => navigation.navigate('Signup')}
        showForgot
        loading={loading.login}
        loginOrRegister={login}
        setState={(field, value) => setState((r) => ({ ...r, [field]: value }))}
        {...state}
      />
    </View>
  );
};

export default Login;

// const Elements = [ { title: 'Individual' }, { title: 'Company' } ];
