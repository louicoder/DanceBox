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

const OrganiserProfile = ({ navigation, route: { params } }) => {
  const [ state, setState ] = React.useState({ ...params, loading: false, fLoading: false });
  const { user } = useSelector((state) => state.Account);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        getUser(params.id);
        console.log('PArams', params.id);
        // getOrganiser();
      });
      return () => sub;
    },
    [ navigation, params ]
  );

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

  const getUser = () => {
    dispatch.Account.getOrganiser({
      uid: params.id,
      callback: (res) => {
        // console.log('RESULT profile', res);
        if (!res.success) return alert('ERror');
        setState({ ...state, ...res.result, dateCreated: new Date(res.result.dateCreated) });
      }
    });
  };

  const followUser = async () => {
    //
  };

  const unfollowUser = async () => {
    //
  };

  const followed = state.followers && state.followers.includes(user.uid);

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
              uri: state.imageUrl
            }}
            style={{ width: '100%', height: RFValue(300) }}
            resizeMode="cover"
          >
            <Pressable
              // onPress={followUnfollow}
              style={{
                paddingHorizontal: RFValue(20),
                paddingVertical: RFValue(10),
                backgroundColor: '#010203',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: RFValue(10),
                right: RFValue(10)
              }}
            >
              <DesignIcon pkg="ft" name={followed ? 'user-check' : 'user-plus'} color="#fff" size={RFValue(20)} />
              <Text style={{ color: '#fff', fontSize: RFValue(16), marginLeft: RFValue(10) }}>
                {followed ? 'Unfollow' : 'Follow'}
              </Text>
            </Pressable>
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
              text={`${state.followers && state.followers.length} followers ・ ${state.following &&
                state.following.length} following`}
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
                    text={`Visit ${social} profile`}
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
