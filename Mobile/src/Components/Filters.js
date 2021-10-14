import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../Utils';

const Filters = ({ filters = [ 'This week', 'This month', 'Next month', 'This year' ] }) => {
  const [ state, setState ] = React.useState('');

  return (
    <ScrollView
      horizontal
      style={{ height: RFValue(20), paddingHorizontal: RFValue(10) }}
      showsHorizontalScrollIndicator={false}
    >
      {filters.map((period, index) => (
        <Pressable
          key={HelperFunctions.keyGenerator()}
          style={{
            paddingHorizontal: RFValue(20),
            backgroundColor: state === index ? '#000' : '#eee',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: RFValue(10),
            borderRadius: RFValue(20),
            flexDirection: 'row',
            height: RFValue(35)
          }}
          onPress={() => setState(index)}
        >
          {state === index && <Icon name="check" color="#fff" size={RFValue(14)} style={{ marginRight: RFValue(5) }} />}
          <Text style={{ fontSize: RFValue(14), color: state === index ? '#fff' : '#000' }}>{period}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Filters;
