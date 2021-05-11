import React from 'react';
import { View, Text, Image, ImageBackground, Alert, Pressable } from 'react-native';
// import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import { HeaderLinker } from '../../Components';
import { HelperFunctions } from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TopCategories = ({ navigation: { navigate } }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: RFValue(10),
        backgroundColor: '#fff',
        marginBottom: RFValue(10),
        paddingVertical: RFValue(15)
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
          { title: 'Events', icon: 'calendar-text', onPress: () => navigate('Events') },
          { title: 'Classes', icon: 'account-group', onPress: () => null },
          { title: 'Trending', icon: 'trending-up', onPress: () => null },
          { title: 'Ticketing', icon: 'tag', onPress: () => null },
          { title: 'Blogs', icon: 'card-text', onPress: () => navigate('BlogScreens') },
          { title: 'Fitness', icon: 'weight-lifter', onPress: () => null }
        ].map(({ title, icon, onPress }) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            style={{
              width: '32%',
              // borderWidth: 0.5,
              // borderColor: '#ccc',
              backgroundColor: '#eeeeee90',
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
            <Icon name={icon} size={RFValue(40)} />
            <Text style={{ fontSize: RFValue(12), color: '#000', fontWeight: 'bold', marginVertical: RFValue(0) }}>
              {title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default TopCategories;
