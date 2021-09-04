import moment from 'moment';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconWithText } from '../../Components';
import { HelperFunctions } from '../../Utils';

const Profile = ({
  accountType,
  resetPassword,
  logout,
  name,
  companyName,
  companyType,
  companyDescription,
  eventCategories,
  followers,
  following,
  interests,
  companyAddress,
  dateCreated,
  _id: uid,
  navigation: { navigate }
}) => {
  const isInd = accountType === 'individual';

  return (
    <React.Fragment>
      <View style={{ backgroundColor: '#fff', marginTop: RFValue(10), padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(17), color: '#aaa' }}>
          Account information:
        </Text>

        <IconWithText
          name="users"
          pkg="ft"
          text={`${followers && followers.length} followers ・ ${following && following.length} following`}
        />
        {!isInd && <IconWithText name="pin" text={companyAddress} />}
        {!isInd && <IconWithText name="team" text={companyType} pkg="ad" />}

        {!isInd ? <IconWithText name="idcard" pkg="ad" text={companyDescription} /> : null}
        {isInd && interests ? (
          <IconWithText name="tago" pkg="ad" text={interests.length ? interests.join(', ') : 'No interests'} />
        ) : null}
        {!isInd && eventCategories && eventCategories.length ? (
          <IconWithText name="tago" pkg="ad" text={eventCategories.join(', ')} />
        ) : null}
        <IconWithText
          name="clockcircleo"
          pkg="ad"
          text={`Created ・ ${moment(dateCreated).fromNow()}`}
          // size={RFValue(23)}
        />
      </View>
      <View style={{ marginTop: RFValue(10), backgroundColor: '#fff', padding: RFValue(10) }}>
        <Text style={{ fontWeight: 'bold', marginVertical: RFValue(10), fontSize: RFValue(17), color: '#aaa' }}>
          Quick account actions:
        </Text>
        {[
          { icon: 'solution1', label: 'All your blogs', onPress: () => navigate('MyBlogs', { uid }) },
          { icon: 'calendar', label: 'All your events', onPress: () => navigate('MyEvents', { uid }) },
          { icon: 'deleteuser', label: 'Close my account', onPress: () => null },
          { icon: 'warning', label: 'Change account password', onPress: () => resetPassword() },
          { icon: 'poweroff', label: 'Logout', last: true, onPress: () => logout() }
        ].map(({ label, icon, last, onPress }) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            onPress={onPress}
            style={{
              flexDirection: 'row',
              // alignItems: label.length > 50 ? 'flex-start' : 'center',
              paddingVertical: RFValue(12),
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: last ? RFValue(20) : RFValue(0),
              alignItems: 'center'
              // borderWidth: 1
            }}
          >
            <IconWithText
              pkg={'ad'}
              name={icon}
              text={label}
              extStyles={{ width: '90%', marginBottom: RFValue(3) }}
              onPress={onPress}
              // size={24}
            />
            <Icon name="chevron-right" size={RFValue(30)} style={{ borderWidth: 0 }} onPress={onPress} />
          </Pressable>
        ))}
      </View>
    </React.Fragment>
  );
};

export default Profile;
