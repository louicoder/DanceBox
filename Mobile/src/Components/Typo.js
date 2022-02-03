import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Typo = ({ style = {}, color = '#010203', size = 14, fontFamily, text, pressable, onPress, lines, ...rest }) => {
  return pressable ? (
    <Pressable onPress={onPress}>
      <Text
        style={{ color, fontFamily: 'Roboto-Regular', fontSize: RFValue(size), ...style }}
        {...rest}
        numberOfLines={lines}
      >
        {text}
      </Text>
    </Pressable>
  ) : (
    <Text
      style={{ color, fontFamily: 'Roboto-Regular', fontSize: RFValue(size), ...style }}
      {...rest}
      numberOfLines={lines}
    >
      {text}
    </Text>
  );
};

export default Typo;
