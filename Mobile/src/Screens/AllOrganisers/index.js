import React from 'react';
import { View, Text, Alert, FlatList, Image, Pressable, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';

const AllOrganisers = ({ navigation }) => {
  const [ state, setState ] = React.useState({ organisers: [] });
  const dispatch = useDispatch();
  const { allOrganisers } = useSelector((state) => state.Account);
  React.useEffect(() => {
    // getOrganisers();
    dispatch.Account.getAllOrganisers(() => {
      // get all organisers
    });
  }, []);

  const getOrganisers = () => {
    firestore()
      .collection('Users')
      .where('accountType', '==', 'company')
      .get()
      .then((resp) => setState({ ...state, organisers: [ ...resp.docs.map((r) => ({ ...r.data(), id: r.id })) ] }))
      .catch((error) => Alert.alert('Error getting organisers', 'There was an error while trying to get organisers '));
  };

  // console.log('Organisers', allOrganisers);
  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: '#eee' }}
      style={{ flex: 1 }}
      keyExtractor={() => HelperFunctions.keyGenerator()}
      data={allOrganisers}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            style={{
              paddingBottom: RFValue(0),
              marginBottom: RFValue(allOrganisers && allOrganisers.length !== index + 1 ? 15 : 0),
              backgroundColor: '#fff'
            }}
            onPress={() => navigation.navigate('OrganiserProfile', { id: item._id })}
          >
            <Image
              source={{ uri: item.imageUrl || CONSTANTS.EVENTS_PIC }}
              style={{ width: '100%', height: RFValue(300) }}
            />
            <View style={{ padding: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(18), marginTop: RFValue(0), fontWeight: 'bold' }}>
                {item.companyName}
              </Text>
              <View style={{ marginVertical: RFValue(10) }}>
                <Text style={{ fontSize: RFValue(16) }}>
                  {item.companyDescription && item.companyDescription.slice(0, 300)}
                  {item.companyDescription && item.companyDescription.length > 300 && '...'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>
                  {item.followers && `${item.followers.length} followers`} ・{' '}
                  {item.following && `${item.following.length} following`}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default AllOrganisers;
