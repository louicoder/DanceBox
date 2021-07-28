import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconWithText } from '../../Components';

const Company = ({ accountType }) => {
  return (
    <React.Fragment>
      <View style={{ backgroundColor: '#fff', marginTop: RFValue(10), padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(17), color: '#aaa' }}>
          Account information:
        </Text>

        <IconWithText name="users" pkg="ft" text={`20k followers ・ 30 following`} />
        <IconWithText name="pin" text="Located ・ Adress, kireka plot 2A coming soon" />
        <IconWithText name="team" text="Community organisation" pkg="ad" />

        <IconWithText
          name="idcard"
          pkg="ad"
          text="description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quos nisi redarguimus, omnis virtus, omne decus, omnis vera laus deserenda est. Tenent mordicus. Egone quaeris, inquit, quid sentiam? Quid ergo attinet dicere"
        />
        <IconWithText name="tago" pkg="ad" text="Dance classes, Photo shoots" />
        <IconWithText name="clockcircleo" pkg="ad" text="Created ・ 20 hours ago" size={RFValue(23)} />
      </View>
      <View style={{ marginTop: RFValue(10), backgroundColor: '#fff', padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(17), color: '#aaa' }}>
          Quick account actions:
        </Text>
        {[
          { icon: 'solution1', label: 'All your blogs', onPress: () => null },
          { icon: 'calendar', label: 'All your events', onPress: () => null },
          { icon: 'deleteuser', label: 'Close my account', onPress: () => null },
          { icon: 'warning', label: 'Change account password', onPress: () => null },
          { icon: 'poweroff', label: 'Logout', last: true, onPress: () => null }
        ].map(({ label, icon, last, onPress }) => (
          <Pressable
            onPress={onPress}
            style={{
              flexDirection: 'row',
              // alignItems: label.length > 50 ? 'flex-start' : 'center',
              paddingVertical: RFValue(10),
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: last ? RFValue(60) : RFValue(10),
              alignItems: 'center'
              // borderWidth: 1
            }}
          >
            <IconWithText pkg={'ad'} name={icon} text={label} extStyles={{ width: '90%', marginBottom: RFValue(3) }} />
            <Icon name="chevron-right" size={RFValue(30)} style={{ borderWidth: 0 }} />
          </Pressable>
        ))}
      </View>
    </React.Fragment>
  );
};

export default Company;
