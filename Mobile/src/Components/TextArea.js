import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Typo } from '.';
import { BLACK, GRAY } from '../Utils/Constants';
import Styles from './Styles';

const Input = ({
  value,
  callback,
  title,
  extInputStyles,
  error,
  loading,
  placeholder,
  kbt = 'default',
  extStyles,
  onBlur,
  inputRef,
  onChangeText,
  minSize = 200,
  placeHolderTextColor = GRAY,
  lines = 40,
  titleStyles
}) => {
  // const [ value, setValue ] = React.useState('');
  // const { height, ...rest } = Styles.input(error);
  // console.log('rest');
  return (
    <View style={[ Styles.inputContainer, extStyles ]}>
      {title ? <Typo size={12} text={title} color={BLACK} style={{ ...titleStyles }} /> : null}
      <TextInput
        textAlignVertical="top"
        multiline={true}
        ref={inputRef}
        // maxLength={RFValue(200)}
        keyboardType={kbt}
        placeholderTextColor={placeHolderTextColor}
        placeholder={placeholder}
        onBlur={onBlur}
        scrollEnabled={false}
        // remove height of input
        style={[
          {
            ...Styles.input,
            minHeight: RFValue(minSize),
            maxHeight: RFValue(minSize),
            paddingTop: RFValue(10),
            paddingBottom: RFValue(10),
            fontFamily: 'Roboto-Regular'
          },
          extInputStyles
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={!loading}
      />
    </View>
  );
};

export default Input;
