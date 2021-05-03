import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, Alert, Keyboard } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import IconComp from '../../Components/Icon';
import Input from '../../Components/Input';
import Option from '../../Components/Option';
import PasswordInput from '../../Components/PasswordInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LOGO from '../../assets/dancebox-logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const statex = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Account);
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    email: '',
    password: '',
    passwordVisible: true,
    justCreated: false,
    docId: ''
  });

  // console.log('loading', loading);

  const loginHandler = () => {
    // console.log('login here');
    const { email, password, docId } = state;
    dispatch.Account.signIn({
      payload: { email, password },
      callback: ({ error, doc }) => {
        if (error) return Alert.alert('Error signing in', error);
        setState({ ...state });
        // console.log('Response from login', doc);
        dispatch.Account.setUserDetails(doc);
        return state.justCreated ? navigation.navigate('Interests', { docId }) : navigation.navigate('Home');
      }
    });
  };

  const createAccountHandler = () => {
    Keyboard.dismiss();
    if (!state.email || !HelperFunctions.validateEmail(state.email) || !state.password)
      return HelperFunctions.Notify(
        'Error creating account',
        'Make sure the Email and password are in a valid format and try again'
      );
    const { email, password, docId } = state;

    const payload = {
      email,
      password,
      followers: [],
      following: [],
      facebook: '',
      linkedin: '',
      twitter: '',
      whatsapp: '',
      instagram: '',
      interests: [],
      accountType: state.activeLogin,
      imageUrl: '',
      uid: docId
    };

    dispatch.Account.createUserAccount({
      payload,
      callback: (res) => {
        // console.log('doc id', res.doc);
        if (res.error) return Alert.alert('Error signing up', res.error);
        HelperFunctions.Notify('Success', 'Your account has been created successfully, you can now login');
        return setState({ ...state, loginMode: true, justCreated: true, docId: res.doc });
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
                'Select an account that you would like to log into.'
              ) : (
                'Enter the details below to create your new account with Mildmay'
              )}
            </Text>

            {state.loginMode ? null : (
              <View
                style={{
                  marginVertical: RFValue(10),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                {Elements.map((props, index) => (
                  <Option
                    {...props}
                    key={index}
                    onPress={() =>
                      setState({ ...state, activeLogin: props.title === state.activeLogin ? null : props.title })}
                    selected={state.activeLogin === props.title}
                  />
                ))}
              </View>
            )}
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
              extStyles={{ backgroundColor: '#010203' }}
              title={state.loginMode ? 'Login' : 'Create account'}
              onPress={() => (state.loginMode ? loginHandler() : createAccountHandler())}
              textStyles={{ color: '#fff', borderWidth: 0 }}
            />
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Login;

const Elements = [ { title: 'Individual' }, { title: 'Company' } ];
