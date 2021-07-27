import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../../../Components/Input';

const PasswordReset = () => {
  return (
    <View>
      {/* <Text /> */}
      <Input title="New password" />
    </View>
  );
};

export default PasswordReset;
