import React from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Option = ({ title, selected = false, onPress, onPressIn, rippleDuration = 350 }) => {
  return (
    <Ripple
      style={{
        flexDirection: 'row',
        backgroundColor: selected ? '#ccc' : 'transparent',
        borderWidth: selected ? 0 : RFValue(1),
        borderColor: '#ccc',
        alignItems: 'center',
        paddingVertical: RFValue(10),
        width: '49%',
        // backgroundColor: '#ccc',
        borderRadius: RFValue(5),
        marginBottom: RFPercentage(1)
      }}
      onPress={onPress}
      onPressIn={onPressIn}
      rippleContainerBorderRadius={RFValue(5)}
      rippleDuration={rippleDuration}
    >
      <Icon
        name={selected ? 'checkbox-marked-circle' : 'circle-outline'}
        size={RFValue(20)}
        style={{ paddingHorizontal: RFValue(5) }}
        color={selected ? '#000' : '#ccc'}
      />
      <Text
        style={{ fontSize: RFValue(14), fontWeight: selected ? '600' : 'normal', color: selected ? '#000' : '#aaa' }}
      >
        {title}
      </Text>
    </Ripple>
  );
};

export default Option;
