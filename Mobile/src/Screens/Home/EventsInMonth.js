import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DesignIcon, IconWithText } from '../../Components';
import OrganiserPreview from '../../Components/OrganiserPreview';
import { CONSTANTS } from '../../Utils';

const EventsInMonth = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        marginTop: RFValue(10),
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // flexWrap: 'wrap',
        backgroundColor: '#fff',
        // paddingBottom: RFValue(10),
        paddingHorizontal: RFValue(10)
      }}
    >
      <Text
        style={{
          // marginHorizontal: RFValue(10),
          marginVertical: RFValue(15),
          fontSize: RFValue(16),
          fontWeight: 'bold',
          backgroundColor: '#fff',
          color: '#aaa'
        }}
      >
        Events happening this month:
      </Text>
      {[ 0, 2, 3, 4 ].map((l) => <OrganiserPreview navigation={navigation} />)}
    </View>
  );
};

export default EventsInMonth;
