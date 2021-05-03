import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const LoadingModal = ({ children, isVisible }) => {
  return isVisible ? (
    <View
      style={{
        position: 'absolute',
        width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.85)',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: '#fff', fontSize: RFValue(12) }}>Loading, please wait...</Text>
      {children}
    </View>
  ) : null;
};

export default LoadingModal;
