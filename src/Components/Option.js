import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Option = ({ title, selected = false, onPress, onPressIn, rippleDuration = 350 }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        backgroundColor: selected ? '#010203' : 'transparent',
        borderWidth: selected ? 0 : 0.5,
        // borderColor: '#ccc',
        alignItems: 'center',
        paddingVertical: RFValue(10),
        width: '49%',
        // backgroundColor: '#ccc',
        borderRadius: RFValue(5),
        marginBottom: RFPercentage(1),
        justifyContent: 'center'
      }}
      // onPress={onPress}
      onPressIn={onPress}
      rippleContainerBorderRadius={RFValue(5)}
      rippleDuration={rippleDuration}
    >
      <Icon
        name={selected ? 'checkbox-marked-circle' : 'circle-outline'}
        size={RFValue(20)}
        style={{ paddingHorizontal: RFValue(5) }}
        color={selected ? '#fff' : '#000'}
      />
      <Text
        style={{ fontSize: RFValue(14), fontWeight: selected ? '600' : 'normal', color: selected ? '#fff' : '#000' }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Option;
