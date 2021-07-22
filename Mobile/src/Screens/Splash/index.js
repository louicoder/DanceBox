import React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LOGO from '../../assets/dancebox-logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { HelperFunctions } from '../../Utils';
import axios from 'axios';

const AUTH = auth();
let sub;
const Splash = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);
  const state = useSelector((state) => state.Account);

  useEffect(() => {
    if (AUTH.currentUser && AUTH.currentUser.uid) {
      const { uid } = AUTH.currentUser;
      // getUserDetails(uid);
      HelperFunctions.getAsyncObjectData('user', ({ error, result }) => {
        if (error) return HelperFunctions.Notify('Error', error);
        if (!result) return navigate('Login');
        else {
          console.log('Result ----++++', result);
          dispatch.Account.setUserDetails(result);
          navigate('Home');
        }
      });
    } else {
      navigate('Login');
    }
  }, []);

  const signIn = (email, password) => {
    dispatch.Account.signIn({
      payload: { email, password },
      callback: ({ error, doc }) => {
        // console.log('USER SIGNED IN', doc);
        dispatch.Account.setUserDetails({ ...doc, password });
        if (error) return Alert.alert('Error signing in', HelperFunctions.switchLoginError(error));
        HelperFunctions.storeAsyncObjectData('user', doc, ({ error }) => {
          if (error) return HelperFunctions.Notify('Error', error);
          return navigation.navigate('Home');
        });
      }
    });
  };

  // // zzL8SUJf7DXv8enu5ALyVfwbks02
  // const getAcc = async () => {
  //   try {
  //     await axios.get('http://localhost:3001/api/accounts/zzL8SUJf7DXv8enu5ALyVfwbks02').then((resp) => {
  //       console.log('RESSSSS', resp.data);
  //     });
  //   } catch (error) {
  //     console.log('ERror', error);
  //   }
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
