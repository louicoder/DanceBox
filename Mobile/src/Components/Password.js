import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typo } from '.';
import Styles from './Styles';

const Input = ({
  value,
  callback,
  title,
  extInputStyles,
  onChangeText,
  error,
  loading,
  placeholder,
  kbt = 'default',
  togglePassword,
  passVisible = false,
  buttonStyles,
  passButtonColor = '#aaa',
  placeHolderTextColor = '#aaa',
  titleStyles
}) => {
  // const [ value, setValue ] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.setNativeProps({
      style: {
        // fontFamily: 'Roboto-Regular'
      }
    });
  }, []);

  return (
    <View style={Styles.inputContainer}>
      {title && (
        <Typo size={12} text={title} color="#01020350" style={{ textTransform: 'capitalize', ...titleStyles }} />
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          ref={inputRef}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!passVisible}
          keyboardType={kbt}
          placeholderTextColor={placeHolderTextColor}
          placeholder={placeholder}
          style={[ Styles.input, { width: '85%', borderRightWidth: 0 }, extInputStyles ]}
          onChangeText={onChangeText}
          value={value}
          editable={!loading}
        />
        <Pressable onPress={togglePassword} style={[ Styles.passWordIcon(error), buttonStyles ]}>
          <Icon name={!passVisible ? 'eye' : 'eye-off'} size={RFValue(25)} color={passButtonColor} />
        </Pressable>
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default Input;
