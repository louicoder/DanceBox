import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { Buton, Input, Password, Typo } from '.';
import { BLUE, GREEN, HEIGHT, WIDTH, BLACK, WHITE } from '../Utils/Constants';

const LoginReg = ({
  showForgot = false,
  forgotOnPress,
  loginOrRegister,
  loading,
  login = true,
  optionOnPress,
  setState,
  email,
  password
}) => {
  const [ visible, setVisible ] = React.useState(false);
  // const [ tate, setState ] = React.useState(false);
  return (
    <View
      style={{ paddingHorizontal: RFValue(10) }}
      // enableOnAndroid={true}
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}
    >
      <Typo
        text={login ? 'Welcome back!' : 'Get Started!'}
        style={{ marginTop: 1 / 20 * HEIGHT, fontWeight: 'bold', color: '#000' }}
        size={30}
      />
      <Typo
        text={
          login ? (
            'Sign into your account'
          ) : (
            'Create your account and start enjyoing the benefits of My Musawo Health care platform.'
          )
        }
        style={{ marginVertical: RFValue(10), marginBottom: RFValue(30) }}
        size={14}
      />
      <Input
        placeholder="Email address"
        placeHolderTextColor="#00000050"
        extStyles={{}}
        extInputStyles={{}}
        onChangeText={(email) => setState('email', email)}
        value={email}
        title="Email address"
      />

      <Password
        placeholder="Password *******"
        onChangeText={(password) => setState('password', password)}
        value={password}
        title="Password"
        placeHolderTextColor="#00000050"
        passButtonColor="#010203"
        passVisible={visible}
        togglePassword={() => setVisible((r) => !r)}
      />

      {showForgot ? (
        <Pressable onPress={forgotOnPress}>
          <Typo text="Forgot Password ?" style={{ textAlign: 'right', marginBottom: RFValue(10), color: 'blue' }} />
        </Pressable>
      ) : null}
      <Buton
        title={!login ? 'Create Account' : 'Login'}
        // onPress={() => navigation.navigate('Main', { screen: 'HomeScreens' })}
        onPress={loginOrRegister}
        loading={loading}
        extStyles={{ backgroundColor: BLACK }}
        textStyles={{ color: WHITE }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: RFValue(10) }}>
        <Typo text={`${login ? 'Not yet' : 'Already'} registered ? `} />
        <Typo
          text={`${!login ? 'Login' : 'Register'} here`}
          style={{ color: 'blue', fontWeight: 'normal' }}
          pressable
          onPress={optionOnPress}
        />
      </View>

      {/* <View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: RFValue(10),
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexGrow: 1, borderWidth: 0.5, borderColor: '#eee', height: RFValue(1) }} />
          <Text
            style={{
              // top: RFValue(-8),
              backgroundColor: 'transparent',
              paddingHorizontal: RFValue(10)
              // fontWeight: 'bold'
            }}
          >
            OR
          </Text>
          <View style={{ flexGrow: 1, borderWidth: 0.5, borderColor: '#eee', height: RFValue(1) }} />
        </View>

        <Buton title="Continue with Google Account" onPress={() => null} />
      </View> */}
    </View>
  );
};

export default LoginReg;
