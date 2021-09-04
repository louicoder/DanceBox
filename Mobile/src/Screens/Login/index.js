import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, Alert, Keyboard, Pressable } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import PasswordInput from '../../Components/PasswordInput';
import LOGO from '../../assets/dancebox-logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';

import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const statex = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Account);
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    justCreated: false,
    passwordVisible: true,
    email: 'test4@test.com',
    password: 'password',
    followers: [],
    following: [],
    facebook: '',
    linkedin: '',
    twitter: '',
    whatsapp: '',
    instagram: '',
    interests: [],
    // accountType: state.activeLogin,
    accountType: 'individual',
    imageUrl: ''
  });

  // console.log('Ladoinf', loading);

  const loginHandler = () => {
    Keyboard.dismiss();
    const { email, password } = state;
    dispatch.Account.login({
      email,
      password,
      callback: ({ success, result }) => {
        if (!success) return HelperFunctions.Notify('Error', result);
        return route.params.goToScreen
          ? navigation.navigate(route.params.goToScreen, { screen: route.params.goToScreen })
          : navigation.navigate('Home');
      }
    });
  };

  // const checkNavigationScreen = () =>

  const switchError = (errorCode) => {
    // console.log(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email is invalid or badly formatted';
      case 'auth/user-disabled':
        return "The user's accont is disabled.";
      case 'auth/user-not-found':
        return 'The does not exist on the platform or has been deleted.';
      case 'auth/wrong-password':
        return 'The login credentials do not match, try again.';
      default:
        return 'An error occured. Try again.';
    }
  };

  React.useEffect(
    () => {
      setState({ ...state, loginMode: route.params.loginMode || true });
      // console.log('USER===', route.params);
    },
    [ navigation ]
  );

  const createAccountHandler = () => {
    Keyboard.dismiss();
    if (!state.email || !HelperFunctions.validateEmail(state.email) || !state.password)
      return HelperFunctions.Notify(
        'Error creating account',
        'Make sure the Email and password are in a valid format and try again'
      );
    const { loginMode, activeLogin, justCreated, passwordVisible, ...payload } = state;

    dispatch.Account.createUserAccount({
      payload,
      callback: ({ success, result }) => {
        if (!success) return HelperFunctions.Notify('Error signing up', result);
        return navigation.navigate('Interests');
      }
    });
  };

  return (
    <React.Fragment>
      <LoadingModal isVisible={loading.createUserAccount || loading.signIn} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', backgroundColor: 'transparent' }}>
        <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <View
            style={{
              height: RFPercentage(100),
              backgroundColor: '#fff',
              paddingHorizontal: RFValue(15),
              justifyContent: 'center'
            }}
          >
            <Image
              source={LOGO}
              style={{ width: RFValue(100), height: RFValue(100), marginBottom: RFValue(20), alignSelf: 'center' }}
            />

            <Text style={{ fontSize: RFValue(25), marginBottom: RFValue(15), textAlign: 'center', fontWeight: 'bold' }}>
              {state.loginMode ? 'Login to your' : 'Create new'} account
            </Text>

            <Text style={{ fontSize: RFValue(14), marginVertical: 10 }}>
              {state.loginMode ? (
                'Enter the details below to login into your Dancebox account.'
              ) : (
                'Enter the details below to create your new account with Dancebox'
              )}
            </Text>

            <Input
              placeholder="Enter your email address"
              value={state.email}
              onChangeText={(email) => setState({ ...state, email })}
            />

            <PasswordInput
              placeholder="Enter your password"
              secure={state.passwordVisible}
              value={state.password}
              switchPasswordVisibility={() => setState({ ...state, passwordVisible: !state.passwordVisible })}
              onChangeText={(password) => setState({ ...state, password })}
            />

            <Button
              loading={loading.login}
              extStyles={{ backgroundColor: '#010203' }}
              title={state.loginMode ? 'Login' : 'Create account'}
              onPress={() => (state.loginMode ? loginHandler() : createAccountHandler())}
              textStyles={{ color: '#fff', borderWidth: 0 }}
            />
            <Pressable
              onPress={() => setState({ ...state, loginMode: !state.loginMode })}
              style={{
                paddingVertical: RFValue(10),
                borderTopWidth: 1,
                borderTopColor: '#ddd',
                marginTop: RFValue(15)
              }}
            >
              <Text style={{ fontSize: RFValue(14), fontWeight: '600', color: '#010203', alignSelf: 'center' }}>
                {state.loginMode ? 'Not registered?' : 'Already registered?'}{' '}
                <Text style={{ color: 'rgb(0,0,255)' }}>{state.loginMode ? 'Register' : 'Login'}</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Login;

// const Elements = [ { title: 'Individual' }, { title: 'Company' } ];
