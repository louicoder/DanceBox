import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { DesignIcon, Typo } from '.';
import { BLACK, BROWN, GRAY } from '../Utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const Select = ({ title = 'options', option = '', extStyles, onPress, titleStyles }) => {
  return (
    <View style={{ marginBottom: RFValue(15), ...extStyles }}>
      <Typo
        text={title}
        style={{ color: BLACK }}
        size={12}
        style={{ marginBottom: RFValue(5), textTransform: 'capitalize', ...titleStyles }}
      />
      <Pressable
        onPress={() => setOptions()}
        style={{
          backgroundColor: BROWN,
          height: RFValue(40),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: RFValue(10)
        }}
        onPress={onPress}
      >
        <Typo text={option || 'Click to select and option/s'} size={14} color={option ? BLACK : GRAY} />
        <DesignIcon name="chevron-down" pkg="mc" />
      </Pressable>
    </View>
  );
};

export default Select;
