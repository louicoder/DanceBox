import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable, ImageBackground, FlatList } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';
import Styles from './Styles';
import { useDispatch } from 'react-redux';
import SingleBlog from '../Blogs/SingleBlog';
import SingleEvent from '../Events/SingleEvent';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../Components/LoadingModal';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, events, blogs } = useSelector((state) => state.Account);
  const xx = useSelector((state) => state);
  const [ state, setState ] = React.useState({ image: {}, progress: 0, ...user });
  const [ imageLoading, setImageLoading ] = React.useState(false);

  React.useEffect(() => {
    getUserEventsAndBlogs();
  }, []);

  const getUserEventsAndBlogs = () =>
    dispatch.Account.getUserEventsAndBlogs({
      uid: user.uid,
      callback: (res) => {
        // console.log('REsponses', res);
      }
    });

  const selectImage = async () =>
    await HelperFunctions.CHECK_GALLERY_PERMISSIONS(async (res) => {
      // console.log('rESult', res);
      if (!res.success) {
        return HelperFunctions.Notify('Error accessing gallery', res.result);
      }
      HelperFunctions.ImagePicker((image) => {
        // console.log('REsponse', image);
        if (image.uri) uploadProfileImage(image);
      });
    });

  const uploadProfileImage = async (image) => {
    try {
      await HelperFunctions.uploadImage(
        `Profiles/${user.uid || auth().currentUser.uid}/${image.fileName}`,
        image.uri,
        (progress) => {
          setState({ ...state, progress });
          setImageLoading(true);
        },
        (error) => {
          // setState({ ...state, progressVisible: false, progress: 0 });
          setImageLoading(false);
          Alert.alert('Error', error);
        },
        async (imageUrl) =>
          dispatch.Account.updateAccountDetails({
            uid: user.uid || auth().currentUser.uid,
            payload: { imageUrl },
            callback: (resp) => {
              // console.log('REsp from update image', resp);
              setImageLoading(false);
              if (resp.error) return HelperFunctions.Notify('Error updating profile photo', resp.result);
              return HelperFunctions.Notify('Success', 'Your profile photo has been updated successfully');
            }
          })
      );
    } catch (error) {
      setImageLoading(false);
      return HelperFunctions.Notify('Error', error.message);
    }
  };

  return (
    <React.Fragment>
      <LoadingModal isVisible={imageLoading}>
        {state.progress > 0 &&
        state.progress < 100 && <Text style={{ color: '#fff', fontSize: RFValue(50) }}>{state.progress}%</Text>}
      </LoadingModal>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: RFValue(10),
              alignItems: 'center',
              paddingTop: RFValue(20)
            }}
          >
            <ImageBackground
              source={{
                uri: user.imageUrl || CONSTANTS.DEFAULT_PROFILE
              }}
              resizeMode="cover"
              style={{ width: RFValue(80), height: RFValue(80), alignSelf: 'center', borderRadius: RFValue(200) }}
              imageStyle={{ borderRadius: RFValue(100) }}
            >
              <Pressable
                onPress={selectImage}
                style={{
                  borderRadius: RFValue(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,.6)'
                }}
              >
                <Icon name="pencil" color="#fff" size={RFValue(40)} />
              </Pressable>
            </ImageBackground>
            <View
              style={{
                borderBottomColor: '#eee',
                flexGrow: 1,
                paddingLeft: RFValue(15)
              }}
            >
              {
                <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {user.name || user.username || '-'}
                </Text>
              }
              <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>{user.email}</Text>
              <Pressable
                onPress={() => navigation.navigate('EditAccount')}
                style={{
                  // borderWidth: 1,
                  backgroundColor: '#010203',
                  paddingVertical: RFValue(10),
                  borderRadius: RFValue(3),
                  width: '100%',
                  borderColor: '#01020330',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: RFValue(10)
                }}
              >
                <Text style={{ fontSize: RFValue(14), color: '#fff' }}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>

          {/* stats */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: RFValue(10)
            }}
          >
            {[
              { title: 'Followers', count: user.followers && user.followers.length },
              { title: 'Following', count: user.following && user.following.length },
              { title: 'Reviews', count: '0' }
            ].map(({ title, count }, index) => (
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: index === 1 ? RFValue(15) : 0,
                  // borderLeftWidth: index === 1 ? 1 : 0,
                  // borderRightWidth: index === 1 ? 1 : 0,
                  paddingHorizontal: index === 1 ? RFValue(20) : 0,
                  borderColor: '#aaa'
                }}
              >
                <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{count}</Text>
                <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>{title}</Text>
              </View>
            ))}
          </View>
          {/* End stats */}

          {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // height: RFValue(40),
            alignSelf: 'center',
            paddingHorizontal: RFValue(10),
            marginBottom: RFValue(10),
            width: '100%',
            borderBottomWidth: 1,
            paddingBottom: RFValue(20),
            borderBottomColor: '#eee'
          }}
        >
          <Pressable style={Styles.socials}>
            <Icon name="instagram" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="snapchat" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="facebook" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="twitter" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="youtube" size={RFValue(40)} />
          </Pressable>
        </View> */}

          <View style={{}}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: RFValue(10),
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-between'
                // paddingVertical: RFValue(10)
              }}
            >
              {[
                { icon: 'card-text', title: 'All Blogs', onPress: () => navigation.navigate('UserBlogs') },
                { icon: 'calendar-outline', title: 'All Events', onPress: () => navigation.navigate('UserEvents') },
                { icon: 'bookmark-outline', title: 'Favorites', onPress: () => null }
              ].map(({ title, icon, onPress }) => (
                <Ripple
                  onPress={onPress}
                  style={{
                    width: '32%',
                    backgroundColor: '#eee',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: RFValue(10),
                    borderRadius: RFValue(5)
                  }}
                >
                  <Icon name={icon} size={RFValue(40)} />
                  <Text>{title}</Text>
                </Ripple>
              ))}
            </View>

            <View style={{}}>
              <Text
                style={{
                  fontSize: RFValue(20),
                  fontWeight: 'bold',
                  margin: RFValue(10),
                  marginTop: RFValue(20),
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#ccc',
                  paddingBottom: RFValue(10)
                }}
              >
                Recent Activity :
              </Text>

              {events && events.length ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ backgroundColor: '#eeeeee90' }}
                  data={events}
                  keyExtractor={() => HelperFunctions.keyGenerator()}
                  renderItem={({ item, index }) => (
                    <SingleEvent header={false} last={index + 1 === events.length} {...item} navigation={navigation} />
                  )}
                />
              ) : null}
            </View>

            <View>
              {blogs && blogs.length ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ backgroundColor: '#eeeeee90' }}
                  data={blogs}
                  keyExtractor={() => HelperFunctions.keyGenerator()}
                  renderItem={({ item, index }) => (
                    <SingleBlog
                      header={false}
                      {...item}
                      navigation={navigation}
                      last={index + 1 === blogs.length}
                      marginBottom={0}
                    />
                  )}
                />
              ) : null}
            </View>

            {events && blogs && !events.length && !blogs.length ? (
              <View
                style={{
                  height: RFValue(300),
                  width: '100%',
                  backgroundColor: '#eeeeee90',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>You have no recent activity yet...</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Account;
