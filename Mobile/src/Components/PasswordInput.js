import React from 'react';
import { View, Text, TextInput, Platform, Pressable } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordInput = ({
  secure = true,
  title = '',
  value,
  onChangeText,
  extStyles,
  placeholder,
  filled = true,
  switchPasswordVisibility
}) => {
  const El = React.useRef(null);

  React.useEffect(() => {
    if (Platform.OS === 'android') return El.current.setNativeProps({ style: { fontFamily: 'Roboto-Regular' } });
  }, []);

  return (
    <View style={{ marginBottom: RFValue(10), width: '100%', flexDirection: 'row' }}>
      {title ? <Text style={{ marginBottom: RFValue(5), fontSize: RFValue(12) }}>{title}</Text> : null}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        autoCompleteType="off"
        ref={El}
        style={{
          height: RFValue(45),
          borderWidth: filled ? 0 : RFValue(1),
          backgroundColor: filled ? '#eee' : 'transparent',
          borderColor: '#ccc',
          flexGrow: 1,
          fontSize: RFValue(16),
          paddingHorizontal: RFValue(10)
          // borderTopLeftRadius: RFValue(5),
          // borderBottomLeftRadius: RFValue(5)
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
      <Pressable
        style={{
          width: RFValue(50),
          backgroundColor: '#eee',
          alignItems: 'center',
          justifyContent: 'center'
          // borderTopRightRadius: RFValue(5),
          // borderBottomRightRadius: RFValue(5)
        }}
        onPress={switchPasswordVisibility}
        // rippleCentered
      >
        <Icon name={secure ? 'eye' : 'eye-off'} size={RFValue(25)} color="#aaa" />
      </Pressable>
    </View>
  );
};

export default PasswordInput;
