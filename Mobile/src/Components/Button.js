import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';

const Button = ({ title, onPress, extStyles, noBg = false, textStyles, loading = false }) => {
  return (
    <Pressable
      onPress={() => (loading ? null : onPress())}
      // onPressIn={onPressIn}
      style={[
        {
          flexDirection: 'row',
          height: RFValue(45),
          backgroundColor: loading ? '#eeeeee' : '#48cae4',
          borderWidth: noBg ? RFValue(1) : 0,
          borderColor: '#48cae4',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: RFValue(10),
          opacity: loading ? 0.3 : 1
        },
        extStyles
      ]}
    >
      {loading ? <ActivityIndicator size={20} color={textStyles.color || '#fff'} /> : null}
      <Text
        style={[
          {
            fontSize: RFValue(14),
            color: '#023e8a',
            textAlign: 'center',
            marginLeft: loading ? RFValue(10) : 0,
            textTransform: 'capitalize'
          },
          textStyles
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
