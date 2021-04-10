import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/dancebox-logo.jpg';
import app from '@react-native-firebase/app';

const Splash = ({ navigation: { navigate } }) => {
  useEffect(() => {
    console.log('App instance', app);
    const timer = setTimeout(() => navigate('Login'), 2000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image
          style={{
            width: RFValue(100),
            height: RFValue(100),
            // borderWidth: RFValue(5),
            borderColor: '#fff',
            padding: RFValue(5)
          }}
          source={LOGO}
        />
        {/* <Text style={{ color: '#169B5C', fontSize: RFValue(20), fontWeight: 'bold' }}>MildMay Uganda</Text> */}
      </View>
      <View style={{ position: 'absolute', bottom: RFValue(30) }}>
        <ActivityIndicator color="#000" />
        <Text style={{ color: '#000' }}>www.skillzeastafrica.com</Text>
      </View>
    </View>
  );
};

export default Splash;
