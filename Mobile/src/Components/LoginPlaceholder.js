import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Button from './Button';
// import LogoBanner from './LogoBanner';

const LoginPlaceholder = ({ login, register }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' }}>
      {/* <LogoBanner /> */}
      {/* <Text style={{ fontSize: RFValue(16), marginVertical: RFValue(20), textAlign: 'center' }}>
        Login to enjoy all the benefits of users on the platform, you are missing. Start to enjoy by tapping the button
        below
      </Text> */}
      <Button
        textStyles={{ color: '#fff', fontWeight: 'normal' }}
        title="Login"
        extStyles={{ alignSelf: 'center', marginBottom: RFValue(10), backgroundColor: '#000' }}
        onPress={login}
      />
      <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: '#eee', marginTop: RFValue(10) }}>
        <Text
          style={{
            position: 'absolute',
            top: RFValue(-8),
            backgroundColor: '#fff',
            paddingHorizontal: RFValue(15),
            alignSelf: 'center'
          }}
        >
          OR
        </Text>
        <Button
          textStyles={{ color: '#fff', fontWeight: 'normal' }}
          title="Create New Account"
          extStyles={{ alignSelf: 'center', backgroundColor: '#000', marginTop: RFValue(18), color: '#fff' }}
          onPress={register}
        />
      </View>
    </View>
  );
};

export default LoginPlaceholder;
