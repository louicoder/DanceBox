import React from 'react';
import { View, Text, StatusBar, SafeAreaView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DesignIcon from './DesignIcon';
import IconComp from './Icon';

const Header = ({
  back = true,
  navigation,
  showRightIcon = false,
  rightIconName = 'bell-outline',
  rightIconOnPress,
  rightIconPkg,
  rightIconSize = 24,
  title,
  ...props
}) => {
  return (
    // <SafeAreaView>
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: RFValue(50),
        alignItems: 'center',
        paddingHorizontal: RFValue(10),
        marginTop: useSafeAreaInsets().top
      }}
    >
      {back ? (
        <Icon
          name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
          size={RFValue(30)}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      <View style={{ flexGrow: 1, alignItems: 'flex-start', paddingHorizontal: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>
      </View>
      {showRightIcon ? (
        <DesignIcon
          name={rightIconName}
          onPress={rightIconOnPress}
          pkg={rightIconPkg}
          // extStyles={{ opacity: 0 }}
          size={RFValue(rightIconSize)}
        />
      ) : null}
    </View>
    // </SafeAreaView>
  );
};

export default Header;
