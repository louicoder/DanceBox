import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DesignIcon from './DesignIcon';

const IconWithText = ({
  name,
  pkg,
  size = RFValue(25),
  text,
  color = '#aaa',
  onPress,
  rightIcon = false,
  extStyles
}) => {
  return (
    <Pressable
      onPress={onPress ? onPress : null}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: text && text.length > 40 ? 'flex-start' : 'center',
        marginBottom: RFValue(10),
        ...extStyles
      }}
    >
      <View style={{ width: '15%' }}>
        <DesignIcon name={name} pkg={pkg} size={size} color={color} extStyles={{ marginRight: RFValue(10) }} />
      </View>
      <View style={{ width: rightIcon ? '70%' : '85%' }}>
        <Text style={{ fontSize: RFValue(15) }}>{text}</Text>
      </View>
      {/* {<View style={{ width: '15%' }}>
        <DesignIcon name={name} pkg={rIpkg} size={size} color={color} extStyles={{ marginRight: RFValue(10) }} />
      </View>} */}
    </Pressable>
  );
};

export default IconWithText;
