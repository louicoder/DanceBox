import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/Logo1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { HelperFunctions } from '../../Utils';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { AUTH, THEME_COLOR } from '../../Utils/Constants';

// const AUTH = auth();
let sub;
const Splash = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);
  const { user } = useSelector((state) => state.Account);

  useEffect(() => {
    getUser();

    return () => {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  const getUser = async () => {
    // console.log('Splash=====', AUTH.currentUser);

    if (!AUTH.currentUser) return navigate('Login');
    return dispatch.Account.getUserDetails({
      uid: AUTH.currentUser.uid,
      callback: (res) => {
        if (!res.success) return navigate('Login');
        navigate('Main', { screen: 'Home' });
      }
    });
    await HelperFunctions.getUser(({ error, result }) => {
      // console.log('Splash=====', result);
      if (error) {
        // return HelperFunctions.Notify('Error', error);
      }
      // if (!result) return navigate('Login');
      dispatch.Account.setUserDetails(result);
      // return navigate('Itro');
    });
  };

  // const signIn = (email, password) => {
  //   dispatch.Account.signIn({
  //     payload: { email, password },
  //     callback: async ({ error, doc }) => {
  //       // console.log('USER SIGNED IN', doc);
  //       dispatch.Account.setUserDetails({ ...doc, password });
  //       // if (error) return Alert.alert('Error signing in', HelperFunctions.switchLoginError(error));
  //       await HelperFunctions.storeAsyncObjectData('user', doc, ({ error }) => {
  //         if (error) return HelperFunctions.Notify('Error', error);
  //         return navigate('Home');
  //       });
  //     }
  //   });
  // };

  const logout = () => {
    // navigate('Login');
    // AUTH.signOut().then(() => navigation.navigate('Login')).catch((error) => console.log('Error', error.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: THEME_COLOR }}>
      <StatusBar backgroundColor={THEME_COLOR} />
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{
            width: RFValue(200),
            height: RFValue(200),
            // borderWidth: RFValue(5),
            borderColor: '#fff',
            padding: RFValue(5)
          }}
          source={LOGO}
          resizeMode="contain"
        />
        {/* <Text style={{ color: '#010203', fontSize: RFValue(30), fontWeight: 'bold' }}>Dance Box</Text> */}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: RFValue(30),
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator color="#000" size={RFValue(14)} animating={loading.getUserDetails} />
        <Text style={{ color: '#000', marginLeft: RFValue(loading.getUserDetails ? 5 : 0) }}>
          www.skillzeastafrica.com
        </Text>
      </View>
    </View>
  );
};

export default Splash;
