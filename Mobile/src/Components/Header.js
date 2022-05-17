import React from 'react';
import { View, Text, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DesignIcon, Typo } from '.';
import { WHITE } from '../Utils/Constants';
import Styles from './Styles';

const Header = ({
  onBackPress,
  leftComp: LeftComponent,
  title,
  rightComp: RightComponent,
  titleStyles,
  navigation,
  iconProps,
  backEnabled = true,
  extStyles
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: useSafeAreaInsets().top + RFValue(60),
        paddingHorizontal: RFValue(10),
        backgroundColor: WHITE,
        ...extStyles
      }}
    >
      <View style={{ height: useSafeAreaInsets().top, backgroundColor: 'transparent' }} />
      <View
        style={{
          width: '100%',
          height: RFValue(60),
          flexDirection: 'row',
          alignItems: 'center'
          // paddingHorizontal: RFValue(10),
          // paddingLeft: RFValue(5),
          // backgroundColor: '#fff'
          // ...extStyles
        }}
      >
        {backEnabled && (
          <View style={{ marginRight: RFValue(10) }}>
            <DesignIcon
              color="#010203"
              // withBorder
              backColor="transparent"
              name={Platform.select({ ios: 'chevron-left', android: 'arrow-left' })}
              pkg="mc"
              size={30}
              onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
              {...iconProps}
            />
          </View>
        )}
        <View style={{ flexGrow: 1 }}>
          {LeftComponent ? (
            <LeftComponent />
          ) : (
            <Typo text={title} size={18} style={{ fontWeight: 'bold', ...titleStyles }} />
          )}
        </View>
        <View style={{}}>{RightComponent ? <RightComponent /> : null}</View>
      </View>
    </View>
  );
};

export default Header;
