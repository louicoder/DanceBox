import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import IconComp from '../../Components/Icon';
import Input from '../../Components/Input';
import Option from '../../Components/Option';
import PasswordInput from '../../Components/PasswordInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LOGO from '../../assets/mildmayLogo.png';

const Login = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    loginMode: true,
    activeLogin: null,
    email: '',
    password: '',
    passwordVisible: true
  });
  React.useEffect(() => {
    // console.log('navigation props', navigation);
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent', backgroundColor: 'transparent' }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View
          style={{
            height: RFPercentage(100),
            backgroundColor: '#fff',
            paddingHorizontal: RFValue(15),
            justifyContent: 'center'
          }}
        >
          {/* <View
            style={{
              width: RFValue(100),
              height: RFValue(100),
              borderWidth: 1,
              alignSelf: 'center',
              marginBottom: RFValue(20)
            }}
          /> */}
          <Image
            source={LOGO}
            style={{ width: RFValue(100), height: RFValue(100), marginBottom: RFValue(20), alignSelf: 'center' }}
          />

          <Text style={{ fontSize: RFValue(25), marginBottom: RFValue(15) }}>
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
                  onPressIn={() => setState({ ...state, activeLogin: index === state.activeLogin ? null : index })}
                  selected={state.activeLogin === index}
                />
              ))}
            </View>
          )}
          <Input placeholder="Enter your email address" />
          {/* <Input placeholder="Enter your email address" />
          <Input placeholder="Enter your email address" /> */}
          {/* <Input placeholder="Enter your password" /> */}
          <PasswordInput
            placeholder="Enter your password"
            secure={state.passwordVisible}
            switchPasswordVisibility={() => setState({ ...state, passwordVisible: !state.passwordVisible })}
          />

          <Button
            extStyles={{ backgroundColor: 'green' }}
            title={state.loginMode ? 'Login' : 'Create account'}
            onPress={() => navigation.navigate('Interests')}
            textStyles={{ color: '#fff' }}
          />
          <TouchableWithoutFeedback
            onPress={() => setState({ ...state, loginMode: !state.loginMode })}
            style={{ paddingVertical: RFValue(10), borderTopWidth: 1, borderTopColor: '#ddd', marginTop: RFValue(15) }}
          >
            <Text style={{ fontSize: RFValue(14), fontWeight: '600', color: 'green', alignSelf: 'center' }}>
              {state.loginMode ? 'Create new account ?' : 'Login to your account'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const Elements = [ { title: 'Individual' }, { title: 'Company' } ];
