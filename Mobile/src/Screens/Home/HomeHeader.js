import { View, Text } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BLACK, SHADOW, WHITE, BROWN, THEME_COLOR, GRAY } from '../../Utils/Constants';
import { useSelector } from 'react-redux';
import { DesignIcon, Typo } from '../../Components';
import FastImage from 'react-native-fast-image';

const HomeHeader = () => {
  const { user } = useSelector((st) => st.Account);
  return (
    <View
      style={{
        paddingTop: useSafeAreaInsets().top,
        // marginBottom: RFValue(10),
        // borderWidth: 1,
        backgroundColor: WHITE,
        // backgroundColor: THEME_COLOR,
        paddingHorizontal: RFValue(10),
        flexDirection: 'row',
        alignItems: 'center',
        height: useSafeAreaInsets().top + RFValue(60),
        ...SHADOW,
        shadowOpacity: 0.2,
        shadowRadius: RFValue(3),
        shadowColor: '#aaa',
        elevation: RFValue(8)
        // shadowColor: 'red'
      }}
    >
      <View
        style={{
          height: RFValue(35),
          width: RFValue(35),
          // borderWidth: 1,
          borderRadius: 50,
          // backgroundColor: BROWN,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {user && user.photoURL ? (
          <FastImage
            source={{ uri: user.photoURL }}
            style={{ width: '100%', height: '100%', borderRadius: RFValue(100) }}
          />
        ) : (
          <View
            style={{
              height: RFValue(35),
              width: RFValue(35),
              // borderWidth: 1,
              borderRadius: 50,
              // borderColor: WHITE,
              backgroundColor: BROWN,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DesignIcon name="user" pkg="ad" color={GRAY} />
          </View>
        )}
      </View>
      <View style={{ flexGrow: 1, marginLeft: RFValue(10) }}>
        <Typo text="Welcome back," size={16} color={BLACK} style={{ fontWeight: 'bold' }} />
        <Typo
          text={user.userName || user.email}
          // size={12}
          style={{ fontWeight: 'normal', textTransform: 'none', lineHeight: RFValue(15) }}
          color={BLACK}
        />
      </View>
      <DesignIcon name="notifications-outline" pkg="io" size={30} />
      <DesignIcon style={{ marginLeft: RFValue(10) }} name="setting" pkg="ad" size={30} color={BLACK} />
      {/* <DesignIcon name="user" pg="ad" /> */}
    </View>
  );
};

export default HomeHeader;
