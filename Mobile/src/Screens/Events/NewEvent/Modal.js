import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

const TimePicker = ({ opacity = 0.8, closeModal, visible = false, ...rest }) => {
  return visible ? (
    <View
      // visible={state.modalVisible}
      hideModal={() => setState({ ...state, modalVisible: false })}
      style={{
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.8)',
        zIndex: 200,
        width: '100%',
        justifyContent: 'flex-end'
      }}
    >
      <Pressable style={{ flexGrow: 1, backgroundColor: 'transparent' }} onPress={closeModal} />
      <View style={{ backgroundColor: 'white', padding: RFValue(10), width: '100%', bottom: 0 }}>{rest.children}</View>
    </View>
  ) : null;
};

export default TimePicker;
