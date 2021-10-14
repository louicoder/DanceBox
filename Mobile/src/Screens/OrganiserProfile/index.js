import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  ImageBackground
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../Components/LoadingModal';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import { DesignIcon, IconWithText } from '../../Components';
import moment from 'moment';
import { EVENTS_PIC } from '../../Utils/Constants';

const OrganiserProfile = ({ navigation, route }) => {
  const [ state, setState ] = React.useState({ loading: false, fLoading: false, followers: [], _id: '' });
  const [ user, setUser ] = React.useState({ _id: '', following: [] });
  const loading = useSelector((state) => state.loading.effects.Account);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getOrganiser();
    HelperFunctions.getUser(({ success, result }) => success && setUser(result));
  }, []);

  const getOrganiserEvents = () => {
    //
  };

  const getOrganiserBlogs = () => {
    //
  };

  // const getUser = () => {
  //   HelperFunctions.getAsyncObjectData('user', ({ error, result }) => {
  //     // console.log('USer', result.uid);
  //     if (error) return alert('Error');
  //     getOrganiser(result.uid);
  //     // setState({...state, result});
  //   });
  // };

  const getOrganiser = () => {
    dispatch.Account.getOrganiser({
      uid: route.params.id,
      callback: ({ success, result }) => {
        if (!success) return HelperFunctions.Notify('ERror getting organiser info');
        setState({ ...state, ...result, dateCreated: new Date(result.dateCreated).toISOString() });
      }
    });
  };

  const followUser = async () => {
    dispatch.Account.followAccount({
      follower: user && user._id,
      following: state._id,
      callback: ({ success, result }) => {
        if (!success) return HelperFunctions.Notify('Error following user', result);
        setState({ ...state, followers: [ ...state.followers, user._id ] });
        updateAccount({ ...user, following: [ ...user.following, state._id ] });
      }
    });
  };

  // console.log('Dispatch', state._id, user._id);

  const updateAccount = (user) =>
    HelperFunctions.storeAsyncObjectData('user', user, ({ result, success }) => {
      if (!success) return Alert.alert('Error following user', result);
    });

  const unfollowUser = async () => {
    dispatch.Account.unfollowAccount({
      follower: state._id,
      following: user && user._id,
      callback: ({ success, result }) => {
        // console.log('USEr- organiser', state.followers, user._id, success, result);

        if (!success) return HelperFunctions.Notify('Error following user', result);
        setState({ ...state, followers: state.followers.filter((r) => r !== user._id) });
        updateAccount({ ...user, following: user.following.filter((r) => r !== state._id) });
      }
    });
  };

  const followed = state.followers && state.followers.includes(user && user._id);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <LoadingModal isVisible /> */}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#eee', paddingHorizontal: RFValue(0), marginTop: RFValue(0) }}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={{
              uri: state.imageUrl || EVENTS_PIC
            }}
            style={{ width: '100%', height: RFValue(300) }}
            resizeMode="cover"
          >
            {state &&
            user &&
            state._id !== user._id && (
              <Pressable
                onPress={() =>
                  (!loading.followAccount || !loading.unfollowAccount) && followed ? unfollowUser() : followUser()}
                style={{
                  width: '35%',
                  height: RFValue(40),
                  backgroundColor: '#010203',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: RFValue(10),
                  right: RFValue(10)
                }}
              >
                {!loading.followAccount &&
                  (!loading.unfollowAccount && (
                    <DesignIcon pkg="ad" name={followed ? 'deleteuser' : 'adduser'} color="#fff" size={RFValue(20)} />
                  ))}
                {loading.followAccount || loading.unfollowAccount ? (
                  <ActivityIndicator color="#fff" size={RFValue(24)} />
                ) : null}
                <Text style={{ color: '#fff', fontSize: RFValue(16), marginLeft: RFValue(10) }}>
                  {followed ? 'Unfollow' : 'Follow'}
                </Text>
              </Pressable>
            )}
          </ImageBackground>
          <View
            style={{
              marginBottom: RFValue(10),
              width: '100%',
              backgroundColor: '#fff',
              padding: RFValue(10),
              paddingVertical: RFValue(15)
            }}
          >
            <Text
              style={{
                fontSize: RFValue(18),
                fontWeight: 'bold'
              }}
            >
              {state.companyName}
            </Text>
          </View>

          <View
            style={{
              marginTop: RFValue(0),
              width: '100%',
              backgroundColor: '#fff',
              paddingVertical: RFValue(15),
              paddingHorizontal: RFValue(10)
            }}
          >
            <Text style={{ fontSize: RFValue(18), fontWeight: 'bold', color: '#aaa' }}>Account Information:</Text>
            <IconWithText
              extStyles={{ marginTop: RFValue(20) }}
              name="users"
              pkg="ft"
              text={`${(state.followers && state.followers.length) || 0} followers ・ ${(state.following &&
                state.following.length) ||
                0} following`}
            />
            <IconWithText name="pin" text={`Located ・ ${state.companyAddress}`} />
            <IconWithText name="team" pkg="ad" text={state.companyType} />

            <IconWithText name="idcard" pkg="ad" text={state.companyDescription} />

            <IconWithText name="tago" pkg="ad" text={state.eventCategories && state.eventCategories.join(', ')} />
            <IconWithText
              name="clockcircleo"
              pkg="ad"
              text={`Created ・ ${moment(state.dateCreated).fromNow()}`}
              size={RFValue(20)}
            />
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
            <Text style={{ fontSize: RFValue(18), fontWeight: 'bold', color: '#aaa', marginBottom: RFValue(20) }}>
              Social media platforms:
            </Text>
            {[ 'facebook', 'instagram', 'youtube', 'whatsapp', 'linkedin', 'twitter' ].map(
              (social, index) =>
                state[social] ? (
                  <IconWithText
                    key={HelperFunctions.keyGenerator()}
                    extStyles={{ marginBottom: RFValue(15) }}
                    name={social}
                    pkg="fa"
                    text={state[social]}
                  />
                ) : null
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrganiserProfile;
