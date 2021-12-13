import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const BottomSheet = ({ isVisible, closeModal, children, extStyles, whiteBG = true, opacity = 0.8 }) => {
  return (
    <Modal
      deviceHeight={4000}
      deviceWidth={width}
      // statusBarTranslucent
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={{ margin: 0 }}
      backdropOpacity={opacity}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      animationInTiming={250}
      animationOut="fadeOutDown"
      animationOutTiming={100}
    >
      <View
        style={{
          position: 'absolute',
          backgroundColor: whiteBG ? '#fff' : 'transparent',
          bottom: 0,
          width: '100%',
          // maxHeight: 0.9 * height,
          // paddingBottom: useSafeAreaInsets().bottom + RFValue(0),
          ...extStyles
          // padding: RFValue(10),
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheet;
