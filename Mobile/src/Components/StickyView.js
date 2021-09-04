import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, NativeModules, Keyboard } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { StatusBarManager } = NativeModules;

const KeyboardStickyView = ({ style, children, customHeight = false, ...other }) => {
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);

  React.useEffect(
    () => {
      const KS = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
      const KH = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

      return () => {
        KH.remove();
        KS.remove();
      };
    },
    [ Keyboard ]
  );

  let statusBarHeight = 0;
  if (Platform.OS === 'ios') {
    StatusBarManager.getHeight((statusBarFrameData) => {
      statusBarHeight = statusBarFrameData.height;
      // console.log('STATUS', statusBarFrameData);
    });
  }

  // Could be nav bar height?
  // Magic number but is necessary to work properly
  const IOS_OFFSET = 40;
  const offHeight = !customHeight ? useSafeAreaInsets().top + IOS_OFFSET : 195;

  // useSafeAreaInsets().top + IOS_OFFSET;
  const getVerticalOffset = () =>
    Platform.select({
      ios: !isKeyboardVisible ? offHeight : 0,
      android: undefined
    });

  // 196 for some screens.
  // useSafeAreaInsets().top + 40 for others.

  return (
    <KeyboardAvoidingView
      style={[ styles.container, style ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={getVerticalOffset()}
      {...other} // can receive other view props
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 200
    // backgroundColor: 'green'
  }
});

export default KeyboardStickyView;
