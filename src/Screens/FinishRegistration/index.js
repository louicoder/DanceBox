import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../../Components/Header';
import Input from '../../Components/Input';

const FinishRegisration = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header {...props} />
      <KeyboardAwareScrollView style={{ flexGrow: 1, paddingHorizontal: RFValue(10) }}>
        <Input title="Events" placeholder="Enter your email" />
        <Input title="Events" placeholder="Enter your email" />
        <Input title="Events" placeholder="Enter your email" />
        <Input title="Events" placeholder="Enter your email" />
        <Input title="Events" placeholder="Enter your email" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default FinishRegisration;
