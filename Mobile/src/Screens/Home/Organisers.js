import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import OrganiserPreview from '../../Components/OrganiserPreview';

const Organisers = ({ navigation }) => {
  return (
    <View style={{ width: '100%', paddingHorizontal: RFValue(10), backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#fff',
          // marginTop: RFValue(0),
          paddingVertical: RFValue(15),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text
          style={{
            // marginHorizontal: RFValue(10),
            fontSize: RFValue(16),
            fontWeight: 'bold',
            color: '#aaa'
          }}
        >
          Events Companies:
        </Text>
        <Pressable
          // onPress={() => Alert.alert('Pending feature', 'This feature is Coming soon')}
          onPress={() => navigation.navigate('AllOrganisers')}
        >
          <Text
            style={{
              marginHorizontal: RFValue(10),
              fontSize: RFValue(14),
              color: 'blue'
              // fontWeight: 'bold'
            }}
          >
            View All
          </Text>
        </Pressable>
      </View>
      {[ 0, 2, 3, 4 ].map(() => <OrganiserPreview navigation={navigation} />)}
    </View>
  );
};

export default Organisers;
