import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from '../../Navigation';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

const Drawer = ({ navigation, ...props }) => {
  // const { user, ...rest } = useSelector((state) => state.Account);
  const [ state, setstate ] = React.useState({});

  const signOut = () => {
    // signout user, clear storage, and redux state
    auth()
      .signOut()
      .then(() =>
        HelperFunctions.removeAsyncObjectData('user', ({ error }) => {
          if (error) return HelperFunctions.Notify('Error', error);
          return navigation.navigate('Login');
        })
      )
      .catch((error) => HelperFunctions.Notify('', error.message));
  };

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        // getEventsInMonth();
        // setstate({ ...user });
        HelperFunctions.getAsyncObjectData('user', ({ result }) => {
          setstate(result);
        });
      });
      return () => sub;
    },
    [ navigation ]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {user && ( */}
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginVertical: RFValue(20),
          marginBottom: 0,
          paddingHorizontal: RFValue(15),
          borderBottomWidth: 1,
          borderBottomColor: '#eeeeee90'
        }}
      >
        <Image
          source={{ uri: state.imageUrl || CONSTANTS.DEFAULT_PROFILE }}
          style={{
            width: RFValue(50),
            height: RFValue(50),
            borderRadius: 150,
            marginBottom: RFValue(10),
            alignSelf: 'center'
          }}
          resizeMode="cover"
        />
        {state.name || state.username ? (
          <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>{state.name || state.username}</Text>
        ) : null}
        <Text style={{ fontSize: RFValue(12), color: '#aaa', marginBottom: RFValue(15) }}>{state.email}</Text>
      </View>

      {state && (
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {[
            {
              title: 'Finish Registration',
              icon: 'information',
              // func: () => navigation.navigate('FinishRegistration')
              func: () => null
            },
            { title: 'Settings', icon: 'cog' },
            { title: 'Profile', icon: 'account-cowboy-hat', func: () => navigation.navigate('Account') },
            { title: 'Reviews', icon: 'comment-edit' },
            { title: 'All Events', icon: 'calendar' },
            { title: 'Events Calendar', icon: 'calendar-clock', func: () => navigation.navigate('Calendar') },
            { title: 'Favorites', icon: 'heart' },
            { title: 'Edit Profile', icon: 'account-edit' },
            { title: 'Notifications', icon: 'bell' },
            // { title: 'Blog Posts', icon: 'equal-box' },
            {
              title: 'Logout',
              icon: 'lock',
              func: () => signOut()
            }
          ].map(({ title, icon, func }) => (
            <Ripple
              key={HelperFunctions.keyGenerator()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // borderBottomWidth: 1,
                borderBottomColor: '#eee',
                // paddingVertical: RFValue(20),
                padding: RFValue(16)
              }}
              onPress={() => (func ? func() : null)}
            >
              <Icon name={icon} size={RFValue(20)} style={{ marginRight: RFValue(10) }} />
              <Text style={{ fontSize: RFValue(16) }}>{title}</Text>
            </Ripple>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Drawer;
