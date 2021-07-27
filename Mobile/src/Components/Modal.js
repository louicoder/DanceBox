import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './Styles';

export default ({
  externalStyles,
  hideModal,
  isVisible,
  closeModal,
  opacity,
  backdropPress = true,
  animationIn = 'slideInUp',
  animationOut = 'fadeOut',
  children,
  ...rest
}) => {
  return (
    <Modal
      style={[ styles.modalContainer, {} ]}
      isVisible={isVisible}
      backdropOpacity={opacity || 0.8}
      animationIn="slideInUp"
      animationInTiming={350}
      animationOut="fadeOut"
      animationOutTiming={100}
      onBackdropPress={() => (backdropPress ? closeModal() : null)}
      backdropTransitionOutTiming={0}
      // propagateSwipe
      // coverScreen
      swipeDirection={[ 'down' ]}
      swipeThreshold={20}
      onSwipeComplete={closeModal}
      hideModalContentWhileAnimating
      onBackButtonPress={closeModal}
      onModalHide={hideModal}
      // hasBackdrop={false}
      useNativeDriver
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
            padding: RFValue(10),
            paddingVertical: useSafeAreaInsets().bottom
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
