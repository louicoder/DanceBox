import { View, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';
import { DesignIcon, Typo } from '../../Components';
import { RFValue } from 'react-native-responsive-fontsize';
import { DARK_BLUE, THEME_COLOR } from '../../Utils/Constants';
import { devAlert } from '../../Utils/HelperFunctions';

const Settings = () => {
  const [ notificationsEnabled, setNotificationsEnabled ] = React.useState(false);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: RFValue(8) }}>
      <Typo text="Push notifications" style={{ marginVertical: RFValue(10), fontWeight: 'bold' }} size={16} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typo
          text={`${notificationsEnabled ? 'Disable' : 'Enable'} this feature incase you ${notificationsEnabled
            ? "don't "
            : ''}want to recieve push notifications from posts and events on the platform`}
          style={{ width: '80%' }}
          size={14}
        />
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          color={THEME_COLOR}
        />
      </View>
      <Typo
        text="Account Management"
        style={{ marginVertical: RFValue(10), fontWeight: 'bold', marginTop: RFValue(30) }}
        size={16}
      />
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => devAlert()}
      >
        <Typo
          text="Delete my account! This ensures your account details are removed from our servers"
          style={{ width: '80%' }}
        />
        <DesignIcon name="chevron-right" pkg="mc" size={30} />
      </Pressable>

      <Typo
        text="About this App"
        style={{ marginVertical: RFValue(10), fontWeight: 'bold', marginTop: RFValue(30) }}
        size={16}
      />
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => devAlert()}
      >
        <Typo text="Dancebox is a platform the connects different people practising arts. Whether its dance, singing, acrobatics, Djeeying, Mceeing and many other visual arts categories are all represented on the platform" />
        {/* <DesignIcon name="chevron-right" pkg="mc" size={30} /> */}
      </Pressable>

      <Typo
        text="Privacy Policy"
        style={{ marginVertical: RFValue(10), fontWeight: 'bold', marginTop: RFValue(30) }}
        size={16}
      />
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => devAlert()}
      >
        <Typo
          text="You can click here to view the platform privacy policy"
          color={DARK_BLUE}
          style={{ width: '80%' }}
        />
        <DesignIcon name="chevron-right" pkg="mc" size={30} color={DARK_BLUE} />
      </Pressable>

      <Typo
        text="Terms and conditions"
        style={{ marginVertical: RFValue(10), fontWeight: 'bold', marginTop: RFValue(30) }}
        size={16}
      />
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => devAlert()}
      >
        <Typo
          text="You can click here to view the platform Terms and conditions"
          color={DARK_BLUE}
          style={{ width: '80%' }}
        />
        <DesignIcon name="chevron-right" pkg="mc" size={30} color={DARK_BLUE} />
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
