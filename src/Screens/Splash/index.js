import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/mildmayLogo.png';

const Splash = ({ navigation: { navigate } }) => {
  useEffect(() => {
    const timer = setTimeout(() => navigate('Login'), 2000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image style={{ width: RFValue(200), height: RFValue(200) }} source={LOGO} />
        {/* <Text style={{ color: '#169B5C', fontSize: RFValue(20), fontWeight: 'bold' }}>MildMay Uganda</Text> */}
      </View>
      <Text style={{ color: 'green', position: 'absolute', bottom: RFValue(30) }}>www.skillzeastafrica.com</Text>
    </View>
  );
};

export default Splash;
