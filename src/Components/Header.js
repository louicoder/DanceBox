import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconComp from './Icon';

const Header = ({ back = true, navigation, showNotif = false, iconName = 'bell-outline', title, ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: RFValue(50),
        alignItems: 'center',
        paddingHorizontal: RFValue(10)
      }}
    >
      {back ? (
        <Icon
          name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
          size={RFValue(30)}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <Icon name="menu" />
      )}
      <View style={{ flexGrow: 1, alignItems: 'flex-start', paddingHorizontal: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>
      </View>
      {showNotif ? <Icon name={iconName} onPress={() => null} extStyles={{ opacity: 0 }} size={RFValue(25)} /> : null}
    </View>
  );
};

export default Header;
