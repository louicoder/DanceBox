import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { Typo } from '.';
import { BLACK, GRAY, HALF_GRAY } from '../Utils/Constants';
import Styles from './Styles';

const Input = React.forwardRef(
  (
    {
      value,
      callback,
      title,
      extInputStyles,
      extStyles,
      error,
      loading,
      placeholder,
      kbt = 'default',
      onChangeText,
      placeHolderTextColor = GRAY,
      titleStyles,
      type
    },
    ref
  ) => {
    // const [ value, setValue ] = React.useState('');
    return (
      // <KeyboardAwareScrollView>
      <View style={[ Styles.inputContainer, extStyles ]}>
        {title ? (
          <Typo size={12} text={title} color={BLACK} style={{ textTransform: 'capitalize', ...titleStyles }} />
        ) : null}
        <TextInput
          ref={ref}
          autoCompleteType="off"
          autoCapitalize="none"
          keyboardType={kbt}
          placeholderTextColor={placeHolderTextColor}
          placeholder={placeholder}
          style={[ Styles.input, extInputStyles ]}
          onChangeText={onChangeText}
          value={value}
          editable={!loading}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
      // </KeyboardAwareScrollView>
    );
  }
);

export default Input;
