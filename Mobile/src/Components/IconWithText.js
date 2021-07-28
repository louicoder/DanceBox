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
  textCntStyles,
  extStyles
}) => {
  const textExists = text && text.trim() && text.length;
  return (
    <Pressable
      onPress={onPress ? onPress : null}
      style={{
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        alignItems: text && text.length > 40 ? 'flex-start' : 'center',
        marginBottom: RFValue(10),
        justifyContent: 'space-between',
        ...extStyles
      }}
    >
      <View style={{}}>
        <DesignIcon name={name} pkg={pkg} size={size} color={color} extStyles={{ marginRight: 0 }} />
      </View>
      <View style={{ width: '85%' }}>
        <Text style={{ fontSize: RFValue(16), color: !textExists ? '#aaa' : '#000' }}>
          {textExists ? text : 'No description'}
        </Text>
      </View>
    </Pressable>
  );
};

export default IconWithText;
