import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import MC from 'react-native-vector-icons/MaterialCommunityIcons';
import MT from 'react-native-vector-icons/MaterialIcons';
import IO from 'react-native-vector-icons/Ionicons';
import AD from 'react-native-vector-icons/AntDesign';
import FOT from 'react-native-vector-icons/Fontisto';
import FA from 'react-native-vector-icons/FontAwesome';
import ET from 'react-native-vector-icons/Entypo';
import EV from 'react-native-vector-icons/EvilIcons';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import SIM from 'react-native-vector-icons/SimpleLineIcons';
import FT from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import Styles from './Styles';

const DesignIcon = ({
  pkg,
  size = 25,
  indicatorSize = 25,
  indicatorColor = '#010203',
  onPress,
  extStyles,
  withBorder,
  backColor = '#eee',
  widthHeight = 40,
  loading = false,
  ...rest
}) => {
  const HOC = (props, Comp) => {
    return withBorder ? (
      <Pressable style={[ Styles.iconWithBg(widthHeight, backColor), extStyles ]}>
        {loading ? (
          <ActivityIndicator size={RFValue(indicatorSize)} color={indicatorColor} />
        ) : (
          <Comp size={RFValue(size)} {...props} />
        )}
      </Pressable>
    ) : (
      <View style={extStyles}>
        {loading ? (
          <ActivityIndicator size={RFValue(indicatorSize)} color={indicatorColor} />
        ) : (
          <Comp size={RFValue(size)} {...props} />
        )}
      </View>
    );
  };

  const RenderPackage = (props) => {
    switch (pkg) {
      case 'mc':
        return HOC(props, MC);
      case 'sim':
        return HOC(props, SIM);
      case 'mt':
        return HOC(props, MT);
      case 'io':
        return HOC(props, IO);
      case 'ad':
        return HOC(props, AD);
      case 'fot':
        return HOC(props, FOT);
      case 'ft':
        return HOC(props, FT);
      case 'fa':
        return HOC(props, FA);
      case 'fa5':
        return HOC(props, FA5);
      case 'et':
        return HOC(props, ET);
      case 'ev':
        return HOC(props, EV);
      default:
        return HOC(props, AD);
    }
  };

  return <RenderPackage pkg={pkg} {...rest} size={size} onPress={onPress} />;
};

export default DesignIcon;
