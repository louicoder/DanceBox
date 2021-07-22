import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../Components/LoadingModal';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';

const OrganiserProfile = ({ navigation, route: { params } }) => {
  const [ state, setState ] = React.useState({ ...params, loading: false, fLoading: false });
  const { user } = useSelector((state) => state.Account);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        getOrganiser();
      });
      return () => sub;
    },
    [ navigation ]
  );

  const getOrganiserEvents = () => {
    // problem is coming home soon.
  };

  // console.log('USER', user);

  const getOrganiser = () => {
    setState({ ...state, loading: true });
    firestore()
      .collection('Users')
      .doc(params.id) // .onSnapshot()
      .onSnapshot(
        (resp) => {
          console.log('Resp data', resp.data().companyName);
          setState({ ...state, ...resp.data(), loading: false });
        },
        (error) => Alert.alert('Error fetching organiser profile', error)
      );
    // .catch((error) => console.log('ERrror getting organiser', error.message));
  };

  const followUnfollow = async () => {
    const update = state.followers.includes(user.uid)
      ? { followers: firestore.FieldValue.arrayRemove(user.uid) }
      : { followers: firestore.FieldValue.arrayUnion(user.uid) };
    await firestore()
      .collection('Users')
      .doc(state.id)
      .update(update)
      .then()
      .catch((error) => Alert.alert('Error updating', error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <LoadingModal isVisible /> */}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#eee', paddingHorizontal: RFValue(0), marginTop: RFValue(0) }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{
              uri: state.imageUrl
            }}
            style={{ width: '100%', height: RFValue(300) }}
            resizeMode="cover"
          />
          <View
            style={{
              // height: RFValue(300),
              marginTop: RFValue(10),
              width: '100%',
              backgroundColor: '#fff',
              padding: RFValue(10),
              paddingVertical: RFValue(15)
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: RFValue(10)
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(18),
                  marginBottom: RFValue(10),
                  fontWeight: 'bold',
                  flexShrink: 1,
                  marginRight: RFValue(10)
                }}
              >
                {state.companyName}:
              </Text>
              <Pressable
                onPress={followUnfollow}
                style={{
                  paddingHorizontal: RFValue(20),
                  paddingVertical: RFValue(10),
                  backgroundColor: '#010203',
                  flexDirection: 'row'
                }}
              >
                {state.fLoading && <ActivityIndicator color="#fff" />}
                <Text style={{ color: '#fff', fontSize: RFValue(14), fontWeight: 'bold', marginLeft: RFValue(5) }}>
                  {user && state.followers && state.followers.includes(user.uid) ? 'Unfollow' : 'Follow'}
                </Text>
              </Pressable>
            </View>

            {/* followers */}
            <Text
              style={{
                fontSize: RFValue(16),
                marginBottom: RFValue(10),
                color: '#aaa',
                paddingBottom: RFValue(10),
                borderBottomWidth: 1
              }}
            >
              {state.followers && state.followers.length} ・ followers
            </Text>

            <Text style={{ fontSize: RFValue(14) }}>{state.companyDescription}</Text>
          </View>

          <View
            style={{
              // height: RFValue(200),
              marginTop: RFValue(10),
              width: '100%',
              backgroundColor: '#fff',
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(15)
            }}
          >
            {[ 'facebook', 'instagram', 'youtube', 'whatsapp', 'linkedin', 'twitter' ].map((social) => (
              <Pressable
                onPress={() => (social && social.length ? HelperFunctions.openLink(state[social]) : null)}
                style={{ flexDirection: 'row', justifyContent: '', alignItems: 'center', marginVertical: RFValue(8) }}
              >
                <Icon
                  name={social}
                  size={RFValue(22)}
                  style={{ marginRight: RFValue(10) }}
                  color={state[social] ? '#010203' : '#00000030'}
                />
                <Text style={{ fontSize: RFValue(14), color: state[social] ? '#010203' : '#00000030' }}>
                  {state[social] || `Organiser has no ${social} added yet.`}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrganiserProfile;
