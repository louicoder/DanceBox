import React from 'react';
import { View, Text, TextInput } from 'react-native';
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
  return (
    <View style={{ marginBottom: RFValue(10), width: '100%', flexDirection: 'row' }}>
      {title ? <Text style={{ marginBottom: RFValue(5), fontSize: RFValue(12) }}>{title}</Text> : null}
      <TextInput
        style={{
          height: RFValue(50),
          borderWidth: filled ? 0 : RFValue(1),
          backgroundColor: filled ? '#eee' : 'transparent',
          borderColor: '#ccc',
          flexGrow: 1,
          fontSize: RFValue(14),
          paddingHorizontal: RFValue(10),
          borderTopLeftRadius: RFValue(5),
          borderBottomLeftRadius: RFValue(5)
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
      <Ripple
        style={{
          width: RFValue(50),
          backgroundColor: '#ddd',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: RFValue(5),
          borderBottomRightRadius: RFValue(5)
        }}
        onPressIn={switchPasswordVisibility}
        rippleCentered
      >
        <Icon name={secure ? 'eye' : 'eye-off'} size={RFValue(25)} color="#aaa" />
      </Ripple>
    </View>
  );
};

export default PasswordInput;
