import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Button from '../../Components/Button';
import Header from '../../Components/Header';

const Doctors = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header {...props} title="Doctors" /> */}
      <View style={{ flexGrow: 1, backgroundColor: 'red' }} />
    </View>
  );
};

export default Doctors;
