import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Input = ({ title = '', value, onChangeText, extStyles, placeholder, filled = true, inputStyles }) => {
  return (
    <View style={[ { marginBottom: RFValue(10), width: '100%' }, extStyles ]}>
      {title ? <Text style={{ marginBottom: RFValue(5), fontSize: RFValue(12) }}>{title}</Text> : null}
      <TextInput
        style={[
          {
            height: RFValue(50),
            borderWidth: filled ? 0 : RFValue(1),
            backgroundColor: filled ? '#eee' : 'transparent',
            borderColor: '#ccc',
            width: '100%',
            fontSize: RFValue(14),
            borderRadius: RFValue(5),
            paddingHorizontal: RFValue(10)
          },
          inputStyles
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;
