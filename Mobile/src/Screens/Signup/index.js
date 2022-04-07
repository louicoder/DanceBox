import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Dimensions, Pressable, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input, Password, Button, Buton, Typo, BottomSheet, LoginReg, OptionsList, Header } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncStorage, KeyGenerator, showAlert, validateEmail } from '../../Utils/HelperFunctions';
import Icon from '../../assets/Back.svg';
import { BLUE, HEIGHT, WIDTH } from '../../Utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUERIES } from '../../Firebase';
import { SvgUri } from 'react-native-svg';

const { height } = Dimensions.get('window');
const Signup = ({ navigation }) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);

  React.useEffect(() => {
    // signup();
  }, []);

  const [ state, setState ] = React.useState({
    email: 'musanje2015@gmail.com',
    password: 'password',
    error: '',
    visible: false,
    patient: true
    // accountType: 'patient'
  });

  const signup = () => {
    // navigation.navigate('Interests');
    // setState((r) => ({ ...r, visible: false }));
    Keyboard.dismiss();
    const { email, password } = state;
    if (!email) return showAlert('Email missing', 'Password is required to continue, try again', 'danger');
    if (!password) return showAlert('Password missing', 'Password is required to continue, try again', 'danger');
    if (!validateEmail(email)) {
      setState((r) => ({ ...r, visible: false }));
      return showAlert('Invalid Email Address', 'Please enter a valid email in order to continue', 'danger');
    }

    dispatch.Account.signup({
      payload: { email, password },
      // type: 'doctors',
      callback: (res) => {
        if (!res.success) {
          console.log('RESULT', res.result);
          // setState((r) => ({ ...state, error: res.result, visible: false }));
          return showAlert('Error Logging In', res.result, 'danger', 'top');
        }
        setState((r) => ({ ...r, visible: false }));
        return navigation.navigate('FinishRegistration');
      }
    });
  };

  const closeModal = React.useCallback(
    () => {
      setState((r) => ({ ...r, visible: false }));
    },
    [ state.visible ]
  );

  const openModal = React.useCallback(
    () => {
      setState((r) => ({ ...r, visible: true }));
    },
    [ state.visible ]
  );

  return (
    <View>
      <BottomSheet isVisible={state.visible} closeModal={closeModal} />

      <LoginReg
        {...state}
        login={false}
        loginOrRegister={signup}
        loading={loading.signup}
        optionOnPress={() => navigation.navigate('Login')}
        setState={(field, value) => setState((r) => ({ ...r, [field]: value }))}
      />
    </View>
  );
};

export default Signup;
