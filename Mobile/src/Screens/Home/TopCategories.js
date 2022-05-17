import React from 'react';
import { View, Text, Image, ImageBackground, Alert, Pressable } from 'react-native';
// import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon, HeaderLinker, Typo } from '../../Components';
import { HelperFunctions } from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SHADOW,
  THEME_COLOR,
  THEME_COLOR3,
  THEME_COLOR4,
  THEME_COLOR5,
  THEME_COLOR6,
  WHITE
} from '../../Utils/Constants';

const TopCategories = ({ navigation: { navigate } }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: RFValue(10),
        backgroundColor: '#fff',
        marginTop: RFValue(30),
        marginBottom: RFValue(40)
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
          { title: 'Calendar', name: 'calendar', pkg: 'si', onPress: () => navigate('Calendar') },
          // { title: 'Classes', name: 'account-group', onPress: () => null },
          {
            title: 'Voting',
            name: 'vote-outline',
            onPress: () => null,
            pkg: 'mc',
            onPress: () => navigate('Voting')
          },
          // { title: 'Ticketing', name: 'tag', onPress: () => null },
          { title: 'Community', name: 'rss-feed', onPress: () => navigate('BlogScreens'), pkg: 'mt' }
          // { title: 'Fitness', name: 'weight-lifter', onPress: () => null }
        ].map(({ title, onPress, ...rest }) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            style={{
              width: '31%',
              borderRadius: RFValue(8),
              // borderWidth: 1,
              borderColor: THEME_COLOR,
              backgroundColor: THEME_COLOR5,
              // backgroundColor: WHITE,
              height: RFValue(100),
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
            <DesignIcon {...rest} pkg={rest.pkg || 'mc'} size={rest.size || 40} />
            <Typo text={title} size={15} style={{ fontWeight: 'normal', marginTop: RFValue(10) }} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TopCategories;
