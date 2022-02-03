import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import { Typo } from '.';
import { BLACK, WHITE } from '../Utils/Constants';

const Button = ({
  title,
  onPress,
  extStyles,
  noBg = false,
  textStyles = { color: WHITE },
  loading = false,
  showLoader = true,
  children
}) => {
  return (
    <Pressable
      onPress={onPress}
      // onPressIn={onPressIn}
      style={[
        {
          flexDirection: 'row',
          height: RFValue(45),
          backgroundColor: noBg ? 'transparent' : BLACK,
          borderWidth: noBg ? RFValue(1) : 0,
          borderColor: BLACK,
          // width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: RFValue(10),
          opacity: loading ? 0.3 : 1
        },
        extStyles
      ]}
    >
      {children}
      {loading && showLoader ? <ActivityIndicator size={20} color={textStyles.color} /> : null}
      <Typo
        text={title}
        style={{
          fontSize: RFValue(14),
          color: '#023e8a',
          textAlign: 'center',
          marginLeft: loading ? RFValue(10) : 0,
          textTransform: 'capitalize',
          ...textStyles
        }}
      />
    </Pressable>
  );
};

export default Button;
