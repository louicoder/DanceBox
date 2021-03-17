import React from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';

const Button = ({ title, onPress, onPressIn, extStyles, rippleDuration = 350, noBg = false, textStyles }) => {
  return (
    <Ripple
      onPress={onPress}
      onPressIn={onPressIn}
      style={[
        {
          height: RFValue(50),
          backgroundColor: noBg ? 'transparent' : '#48cae4',
          borderWidth: !noBg ? RFValue(1) : 0,
          borderColor: '#48cae4',
          width: '100%',
          borderRadius: RFValue(5),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: RFValue(10)
        },
        extStyles
      ]}
      rippleDuration={rippleDuration}
    >
      <Text style={[ { fontSize: RFValue(16), fontWeight: '600', color: '#023e8a', textAlign: 'center' }, textStyles ]}>
        {title}
      </Text>
    </Ripple>
  );
};

export default Button;
