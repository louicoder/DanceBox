import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import OrganiserPreview from '../../Components/OrganiserPreview';
import { HelperFunctions } from '../../Utils';

const Organisers = ({ navigation }) => {
  const [ organisers, setOrganisers ] = React.useState([]);
  const dispatch = useDispatch();
  const { randomOrganisers } = useSelector((state) => state.Account);
  React.useEffect(() => {
    getRandomOrganisers();
  }, []);

  const getRandomOrganisers = () => {
    dispatch.Account.getRandomOrganisers(({ success, result }) => {
      // console.log('RES----DOC', res.doc);
      if (!success) return Alert.alert('Error', result);
      // setState(doc);
    });
  };

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
          Featured Event Companies:
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
      {randomOrganisers &&
        randomOrganisers.map((orgzr) => (
          <OrganiserPreview key={HelperFunctions.keyGenerator()} navigation={navigation} {...orgzr} />
        ))}
    </View>
  );
};

export default Organisers;
