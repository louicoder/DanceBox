import React from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconComp = ({ extStyles, name, size = 25, anCentered = true, duration = 300, onPress }) => {
  return (
    <Ripple
      style={{
        backgroundColor: 'transparent',
        borderRadius: RFValue(50),
        // borderWidth: 1,
        height: RFValue(35),
        width: RFValue(35),
        alignItems: 'center',
        justifyContent: 'center'
      }}
      rippleContainerBorderRadius={RFValue(50)}
      rippleCentered={anCentered}
      rippleDuration={duration}
      onPress={onPress}
    >
      <Icon name={name} style={[ {}, extStyles ]} size={RFValue(size)} />
    </Ripple>
  );
};

export default IconComp;
