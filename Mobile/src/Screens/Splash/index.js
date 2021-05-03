import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/dancebox-logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

const AUTH = auth();
let sub;
const Splash = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);
  useEffect(() => {
    if (AUTH.currentUser) {
      const { uid } = AUTH.currentUser;
      getUserDetails(uid);
    } else {
      navigate('Login');
    }

    return () => clearTimeout(sub);
  }, []);

  const getUserDetails = (uid) =>
    dispatch.Account.getUserDetails({
      uid,
      callback: ({ error, doc }) => {
        console.log('DOC SININ', doc);
        if (error) return navigate('Login');
        dispatch.Account.setUserDetails(doc);
        return navigate('Home');
      }
    });

  // const navigateoLogin = () => {
  //   return navigate('Interests');
  // };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
        <Text style={{ color: '#010203', fontSize: RFValue(30), fontWeight: 'bold' }}>Dance Box</Text>
      </View>
      <View style={{ position: 'absolute', bottom: RFValue(30) }}>
        {loading.getUserDetails && <ActivityIndicator color="#000" />}
        <Text style={{ color: '#000' }}>www.skillzeastafrica.com</Text>
      </View>
    </View>
  );
};

export default Splash;
