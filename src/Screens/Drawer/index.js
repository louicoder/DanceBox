import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from '../../Navigation';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';

const Drawer = (props) => {
  const { user } = useSelector((state) => state.Account);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          // backgroundColor: 'purple',
          alignItems: 'center',
          marginVertical: RFValue(20),
          marginBottom: 0
          // borderWidth: 1
          // flexDirection: 'row'
        }}
      >
        <Image
          source={{ uri: user.imageUrl || CONSTANTS.DEFAULT_PROFILE }}
          style={{ width: RFValue(100), height: RFValue(100), borderRadius: 150 }}
          resizeMode="cover"
        />
        {user.name || user.username ? (
          <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>{user.name || user.username}</Text>
        ) : null}
        <Text style={{ fontSize: RFValue(12), color: '#aaa', marginBottom: RFValue(15) }}>{user.email}</Text>
      </View>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {[
          { title: 'Finish Registration', icon: 'information', goto: 'FinishRegistration' },
          { title: 'Settings', icon: 'cog' },
          { title: 'Profile', icon: 'account-cowboy-hat', goto: 'Account' },
          { title: 'Reviews', icon: 'comment-edit' },
          { title: 'Events', icon: 'calendar-clock' },
          { title: 'Favorites', icon: 'heart' },
          { title: 'Edit Profile', icon: 'account-edit' },
          { title: 'Notifications', icon: 'bell' },
          { title: 'Blog Posts', icon: 'equal-box' },
          // { title: 'Online doctors', icon: 'signal-variant' },
          // { title: 'Appointments', icon: 'alarm' },
          { title: 'Logout', icon: 'lock' }
        ].map(({ title, icon, goto }) => (
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
            onPress={() => (goto ? props.navigation.navigate(goto, { title }) : null)}
          >
            <Icon name={icon} size={RFValue(20)} style={{ marginRight: RFValue(10) }} />
            <Text style={{ fontSize: RFValue(16) }}>{title}</Text>
          </Ripple>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Drawer;
