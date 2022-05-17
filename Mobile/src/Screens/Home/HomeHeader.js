import { View, Text } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BLACK, SHADOW, WHITE, BROWN, THEME_COLOR } from '../../Utils/Constants';
import { useSelector } from 'react-redux';
import { DesignIcon, Typo } from '../../Components';
import FastImage from 'react-native-fast-image';

const HomeHeader = () => {
  const { user } = useSelector((st) => st.Account);
  return (
    <View
      style={{
        marginTop: useSafeAreaInsets().top,
        // marginBottom: RFValue(10),
        // borderWidth: 1,
        backgroundColor: WHITE,
        backgroundColor: THEME_COLOR,
        paddingHorizontal: RFValue(10),
        flexDirection: 'row',
        alignItems: 'center',
        height: RFValue(60),
        ...SHADOW,
        elevation: RFValue(10),
        shadowRadius: RFValue(3)
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
          <DesignIcon name="user" pkg="ad" />
        )}
      </View>
      <View style={{ flexGrow: 1, marginLeft: RFValue(10) }}>
        <Typo text="Welcome back," size={14} color={WHITE} style={{ fontWeight: 'bold' }} />
        <Typo
          text={user.userName || user.email}
          size={12}
          style={{ fontWeight: 'normal', textTransform: 'none', lineHeight: RFValue(15) }}
          color={WHITE}
        />
      </View>
      {/* <DesignIcon withBorder={false} name="bell-outline" pkg="mc" widthHeight={35} /> */}
      {/* <DesignIcon withBorder={false} name="setting" pkg="ad" widthHeight={35} color={WHITE} /> */}
      {/* <DesignIcon name="user" pg="ad" /> */}
    </View>
  );
};

export default HomeHeader;
