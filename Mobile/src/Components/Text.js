import React from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

const TextComp = ({ extStyles, text, link, ...props }) => {
  return link ? (
    <TouchableWithoutFeedback>
      <Text {...props} style={[ { fontSize: RFValue(14) }, extStyles ]}>
        {text}
      </Text>
    </TouchableWithoutFeedback>
  ) : (
    <Text {...props} style={[ { fontSize: RFValue(14) }, extStyles ]}>
      {text}
    </Text>
  );
};

export default TextComp;
