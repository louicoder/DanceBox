import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Typo = ({
  style = {},
  color = '#010203',
  size = 14,
  fontFamily,
  text,
  pressable,
  onPress,
  lines,
  children,
  ...rest
}) => {
  return (
    <Text
      style={{ color, fontFamily: 'Roboto-Regular', fontSize: RFValue(size), ...style }}
      {...rest}
      numberOfLines={lines}
      onPress={onPress}
    >
      {text}
      {children}
    </Text>
  );
};

export default Typo;
