import React from 'react';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';

const HeaderLinker = ({ title, extStyles }) => {
  return (
    <View
      style={[
        {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: RFValue(10),
          // borderWidth: 1,
          justifyContent: 'space-between'
        },
        extStyles
      ]}
    >
      <Text text={title} extStyles={{ fontSize: RFValue(14), fontWeight: '700' }} />
      <Ripple style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
        <Text text="View all" extStyles={{ marginRight: RFValue(0), fontSize: RFValue(14) }} />
        <Icon name="chevron-right" size={RFValue(20)} />
      </Ripple>
    </View>
  );
};

export default HeaderLinker;
