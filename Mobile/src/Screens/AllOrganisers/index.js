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
    // <SafeAreaView style={{ flex: 1 }}>
    // <View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={{ backgroundColor: '#eee' }}
      style={{ flex: 1 }}
      keyExtractor={() => HelperFunctions.keyGenerator()}
      data={allOrganisers}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        // console.log('index', index, item.id);
        return (
          <Pressable
            style={{ paddingBottom: RFValue(0), marginBottom: RFValue(15), backgroundColor: '#fff' }}
            onPress={() => navigation.navigate('OrganiserProfile', { id: item.uid })}
          >
            <Image
              source={{ uri: item.imageUrl || CONSTANTS.EVENTS_PIC }}
              style={{ width: '100%', height: RFValue(200) }}
            />
            <View style={{ padding: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(18), marginTop: RFValue(0), fontWeight: 'bold' }}>
                {item.companyName}
              </Text>
              {/* <View>
                {item.eventCatgeories &&
                  item.eventCatgeories.map((cat) => (
                    <Text style={{ fontSize: RFValue(10), padding: RFValue(5) }}>{cat}</Text>
                  ))}
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: RFValue(10)
                }}
              >
                {/* <Text style={{ fontSize: RFValue(14) }}>{item.dateCreated}</Text> */}
                <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>
                  {item.followers && item.followers.length} ・ followers
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
    // </View>
    // </SafeAreaView>
  );
};

export default AllOrganisers;
