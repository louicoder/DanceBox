import React from 'react';
import { View, Text, Image, ImageBackground, Alert, Pressable } from 'react-native';
// import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon, HeaderLinker, Typo } from '../../Components';
import { HelperFunctions } from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR3, THEME_COLOR4 } from '../../Utils/Constants';

const TopCategories = ({ navigation: { navigate } }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: RFValue(10),
        backgroundColor: '#fff',
        // marginBottom: RFValue(10),
        paddingVertical: RFValue(10)
      }}
    >
      {/* <HeaderLinker title="Top Categories" all={false} /> */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        {[
          { title: 'Calendar', name: 'calendar-text', onPress: () => navigate('Calendar') },
          { title: 'Classes', name: 'account-group', onPress: () => null },
          { title: 'Voting', name: 'vote-yea', onPress: () => null, pkg: 'fa5' },
          { title: 'Ticketing', name: 'tag', onPress: () => null },
          { title: 'Community', name: 'account-group', onPress: () => navigate('BlogScreens') },
          { title: 'Fitness', name: 'weight-lifter', onPress: () => null }
        ].map(({ title, onPress, ...rest }) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            style={{
              width: '32%',
              // borderWidth: 0.5,
              // borderColor: '#ccc',
              // backgroundColor: '#eeeeee90',
              backgroundColor: `${THEME_COLOR4}30`,
              height: RFValue(100),
              marginBottom: RFValue(5),
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() =>
              onPress
                ? onPress()
                : Alert.alert(
                    'Coming soon',
                    'This feature is coming soon, please watch the space for more upcoming updates...'
                  )}
          >
            <DesignIcon {...rest} pkg={rest.pkg || 'mc'} size={30} />
            <Typo text={title} size={15} style={{ fontWeight: 'bold', marginTop: RFValue(10) }} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TopCategories;
