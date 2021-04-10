import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from '../../Navigation';
import { HelperFunctions } from '../../Utils';

const Drawer = (props) => {
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
        }}
      >
        <Image
          source={{ uri: 'https://www.goplacesdigital.com/wp-content/uploads/2020/06/IMG-20200618-WA0013.jpg' }}
          style={{ width: RFValue(100), height: RFValue(100), borderRadius: 150 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>Bboy Rique</Text>
        <Text style={{ fontSize: RFValue(14), color: '#aaa', marginBottom: RFValue(15) }}>rique256@mail.com</Text>
      </View>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {[
          { title: 'Finish Registration', icon: 'information', goto: 'FinishRegistration' },
          { title: 'Settings', icon: 'cog' },
          { title: 'Profile', icon: 'account-cowboy-hat' },
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
