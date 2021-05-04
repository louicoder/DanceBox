import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/dancebox-logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { HelperFunctions } from '../../Utils';

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
        // console.log('DOC SININ', doc);s
        if (error) return navigate('Login');
        dispatch.Account.setUserDetails(doc);
        checkPermissions();
      }
    });

  React.useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      await HelperFunctions.CHECK_GALLERY_PERMISSIONS((res) => {
        // console.log('Gallery prems', res);
        if (!res.success) {
          HelperFunctions.Notify(
            'Error',
            'You need to grant DAncebox permissions to access your gallery so you can upload images '
          );
          return navigate('Home');
        }
        return navigate('Home');
      });
    } catch (error) {
      return HelperFunctions.Notify('Error', error.message);
    }
  };

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
