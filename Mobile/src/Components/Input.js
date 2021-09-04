import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Input = ({
  title = '',
  value,
  number,
  onChangeText,
  extStyles,
  placeholder,
  filled = true,
  onSubmitEditing,
  multiline = false,
  inputStyles
}) => {
  return (
    <View style={[ { marginBottom: RFValue(10), width: '100%' }, extStyles ]}>
      {title ? <Text style={{ marginBottom: RFValue(5), fontSize: RFValue(12) }}>{title}</Text> : null}
      <TextInput
        keyboardType={number ? 'number-pad' : 'default'}
        multiline={multiline}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="off"
        onSubmitEditing={onSubmitEditing}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          {
            height: RFValue(45),
            borderWidth: filled ? 0 : RFValue(1),
            backgroundColor: filled ? '#eee' : 'transparent',
            borderColor: '#ccc',
            width: '100%',
            fontSize: RFValue(16),
            // borderRadius: RFValue(5),
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
