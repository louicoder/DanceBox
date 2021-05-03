import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ComingSoon = ({ title = 'Watch this space for some exciting stuff coming your way very soon', extStyles }) => {
  return (
    <View
      style={[
        {
          width: '100%',
          minHeight: RFValue(200),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eee',
          paddingHorizontal: RFValue(15)
        },
        extStyles
      ]}
    >
      <Text style={{ color: '#00000080', textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default ComingSoon;
