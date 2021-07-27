import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Company = () => {
  return (
    <React.Fragment>
      <View style={{ backgroundColor: '#fff', marginTop: RFValue(10), padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(16) }}>
          Account information:
        </Text>
        {[
          { icon: 'trending-up', label: '20k ・ following ', onPress: () => alert('yes') }
        ].map(({ label, icon, onPress }) => (
          <Pressable
            onPress={onPress}
            style={{
              flexDirection: 'row',
              alignItems: label.length > 50 ? 'flex-start' : 'center',
              paddingVertical: RFValue(5),
              width: '100%'
            }}
          >
            <Icon name={icon} size={RFValue(25)} />
            <View style={{ flexShrink: 1, marginLeft: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(14) }}>{label}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={{ marginTop: RFValue(10), backgroundColor: '#fff', padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(16) }}>
          Quick account actions:
        </Text>
        {[
          { icon: 'comment-text', label: 'All your blog posts', onPress: () => null },
          // { icon: 'bell-outline', label: 'check your notifications' },
          // { icon: 'calendar-blank-outline', label: 'All your events', onPress: () => null },
          { icon: 'shield-remove', label: 'Close my account', onPress: () => null },
          { icon: 'account-key', label: 'Change account password', onPress: () => null },
          { icon: 'location-exit', label: 'Logout', onPress: () => alert(), last: true }
        ].map(({ label, icon, onPress, last }) => (
          <Pressable
            onPress={onPress}
            style={{
              flexDirection: 'row',
              // alignItems: label.length > 50 ? 'flex-start' : 'center',
              paddingVertical: RFValue(10),
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: last ? RFValue(100) : RFValue(10)
              // borderWidth: 1
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name={icon} size={RFValue(25)} />
              <Text style={{ fontSize: RFValue(14), marginLeft: RFValue(10) }}>{label}</Text>
            </View>
            <Icon name="chevron-right" size={RFValue(25)} style={{ alignSelf: 'flex-end' }} />
          </Pressable>
        ))}
      </View>
    </React.Fragment>
  );
};

export default Company;
