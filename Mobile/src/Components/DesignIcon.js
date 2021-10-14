import React from 'react';
import { View, Text } from 'react-native';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import MT from 'react-native-vector-icons/MaterialIcons';
import IO from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';
import FOT from 'react-native-vector-icons/Fontisto';
import FO from 'react-native-vector-icons/FontAwesome';
import FT from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

const DesignIcon = ({ pkg, name, size = 24, color, extStyles, onPress }) => {
  const RenderPackage = ({ pkg }) => {
    switch (pkg) {
      case 'mc':
        return <MC name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'ft':
        return <FT name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'mt':
        return <MT name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'io':
        return <IO name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'ad':
        return <AD name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'fot':
        return <FOT name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      case 'fo':
        return <FO name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
      default:
        return <MC name={name} size={RFValue(size)} color={color} style={extStyles} onPress={onPress} />;
    }
  };

  return <RenderPackage pkg={pkg} />;
};

export default DesignIcon;
