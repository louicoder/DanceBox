import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OptionsSelector = ({ items, header, extStyles, defaultValue, setItem }) => {
  const [ state, setState ] = React.useState(defaultValue);
  return (
    <View>
      <Text style={{ fontSize: RFValue(14) }}>{header}:</Text>
      <View style={{ flexDirection: 'row', marginVertical: RFValue(10) }}>
        {items.map((item, index) => (
          <Pressable
            onPress={() => {
              setState(item === state ? '' : item);
              setItem(item);
            }}
            style={[
              {
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                height: RFValue(50),
                backgroundColor: state === item ? '#000' : 'transparent',
                borderWidth: 1,
                flexDirection: 'row',
                borderLeftWidth: (items.length === 3 || items.length === 2) && index === 1 ? 0 : 1,
                borderRightWidth: items.length === 3 && index === 1 ? 0 : 1
              },
              extStyles
            ]}
          >
            {state === item ? <Icon name="check" size={RFValue(20)} color="#fff" /> : null}
            <Text
              style={{
                color: state === item ? '#fff' : '#000',
                marginLeft: RFValue(5),
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OptionsSelector;
