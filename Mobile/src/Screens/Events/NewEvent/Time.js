import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Time = () => {
  const [ state, setState ] = React.useState('');
  return (
    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {times.map((time) => (
        <Pressable
          onPress={() => setState(time)}
          style={{
            width: '24%',
            borderWidth: state === time ? 0 : 1,
            borderColor: '#aaa',
            marginBottom: RFValue(5),
            justifyContent: 'center',
            height: RFValue(30),
            alignItems: 'center',
            backgroundColor: state === time ? '#000' : 'transparent'
          }}
        >
          <Text style={{ color: state === time ? '#fff' : '#000' }}>{time}</Text>
        </Pressable>
      ))}
      {}
    </View>
  );
};

export default Time;

const times = [
  '8:00am',
  '9:00am',
  '10:00am',
  '11:00am',
  '12:00pm',
  '1:00pm',
  '2:00pm',
  '3:00pm',
  '4:00pm',
  '5:00pm',
  '6:00pm',
  '7:00pm',
  '8:00pm',
  '9:00pm',
  '10:00pm',
  '11:00pm'
];
