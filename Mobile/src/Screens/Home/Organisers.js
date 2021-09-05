import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import OrganiserPreview from '../../Components/OrganiserPreview';
import { HelperFunctions } from '../../Utils';
import { THEME_COLOR, THEME_COLOR3, THEME_COLOR7 } from '../../Utils/Constants';

const Organisers = ({ navigation }) => {
  const [ organisers, setOrganisers ] = React.useState([]);
  const dispatch = useDispatch();
  const { randomOrganisers } = useSelector((state) => state.Account);
  // const { randomOrganisers } = useSelector((state) => state.Account);
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
            fontWeight: 'bold'
            // color: THEME_COLOR
          }}
        >
          Featured Event Organisers:
        </Text>
        <Pressable
          // onPress={() => Alert.alert('Pending feature', 'This feature is Coming soon')}
          onPress={() => navigation.navigate('AllOrganisers')}
        >
          <Text
            style={{
              marginHorizontal: RFValue(10),
              fontSize: RFValue(14),
              color: THEME_COLOR3
              // fontWeight: 'bold'
            }}
          >
            View All
          </Text>
        </Pressable>
      </View>
      {randomOrganisers && randomOrganisers.length ? (
        randomOrganisers.map((orgzr) => (
          <OrganiserPreview key={HelperFunctions.keyGenerator()} navigation={navigation} {...orgzr} />
        ))
      ) : null}
      {randomOrganisers && !randomOrganisers.length ? (
        <Pressable
          onPress={() => navigation.navigate('AllOrganisers')}
          style={{
            height: RFValue(200),
            paddingHorizontal: RFValue(10),
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>
            We are constantly getting our hands to work to curate for you interesting event organisers, keep checking!
            You can tap here to view all organisers on the platform.
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Organisers;
