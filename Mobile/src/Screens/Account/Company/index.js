import React from 'react';
import { View, Text } from 'react-native';
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
          { icon: 'trending-up', label: '20k followers ・ 12k following' },
          {
            icon: 'equal',
            label:
              'description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos nisi redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est. Tenent mordicus. Egone quaeris, inquit, quid sentiam? Quid ergo attinet dicere',
            start: true
          },
          { icon: 'tag', label: 'Dance company, Classes, youth empowerment' },
          { icon: 'clock', label: '23 hours created.' }
        ].map(({ label, icon, start }) => (
          <View
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
          </View>
        ))}
      </View>
      <View style={{ marginTop: RFValue(10), backgroundColor: '#fff', padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(16) }}>
          Quick account actions:
        </Text>
        {[
          { icon: 'comment-text', label: 'All your blogs' },
          { icon: 'calendar-blank-outline', label: 'All your events' },
          { icon: 'calendar-blank-outline', label: 'All your blogs' },
          { icon: 'account-remove-outline', label: 'Close my account' },
          { icon: 'account-key', label: 'Change account password' },
          { icon: 'location-exit', label: 'Logout', last: true }
        ].map(({ label, icon, last }) => (
          <View
            style={{
              flexDirection: 'row',
              // alignItems: label.length > 50 ? 'flex-start' : 'center',
              paddingVertical: RFValue(10),
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: last ? RFValue(100) : RFValue(10),
              alignItems: 'center'
              // borderWidth: 1
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name={icon} size={RFValue(25)} />
              <Text style={{ fontSize: RFValue(14), marginLeft: RFValue(10) }}>{label}</Text>
            </View>
            <Icon name="chevron-right" size={RFValue(25)} style={{ alignSelf: 'flex-end' }} />
          </View>
        ))}
      </View>
    </React.Fragment>
  );
};

export default Company;
