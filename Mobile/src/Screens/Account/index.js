import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Keyboard,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from 'react-native';
// import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';
import Styles from './Styles';
import { useDispatch } from 'react-redux';
// import SingleBlog from '../Blogs/SingleBlog';
// import SingleEvent from '../Events/SingleEvent';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../Components/LoadingModal';
import Menus from './Menus';
import Modal from '../../Components/Modal';
import PasswordReset from './Individual/PasswordReset';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { events, blogs } = useSelector((state) => state.Account);
  const xx = useSelector((state) => state);
  const [ state, setState ] = React.useState({ image: {}, progress: 0, user: {}, isVisible: true });
  const [ imageLoading, setImageLoading ] = React.useState(false);
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);

  React.useEffect(
    () => {
      // getUserEventsAndBlogs();

      const sub = navigation.addListener('focus', () => {
        console.log('focused');
        getUser();
      });

      return () => sub;
    },
    [ navigation ]
  );

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        HelperFunctions.removeAsyncObjectData('user', () => {
          navigation.navigate('Login');
        });
      })
      .catch((error) => console.log('Error logoing out', error.message));
  };

  React.useEffect(() => {
    const KS = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const KH = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      KH.remove();
      KS.remove();
    };
  }, []);

  const getUser = async () => {
    await HelperFunctions.getAsyncObjectData('user', ({ result: user }) => {
      setState({ ...state, user });
    });
  };

  const selectImage = async () => {
    // await HelperFunctions.CheckPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY, (res) => {
    //   console.log('RESult', res);
    // });

    HelperFunctions.ImagePicker((image) => {
      if (image.uri) uploadProfileImage(image);
    });
    // await check(PERMISSIONS.IOS.MEDIA_LIBRARY)
    //   .then((res) => console.log('RES permision', res))
    //   .catch((error) => console.log('ERror permissions', error.message));
  };
  // await HelperFunctions.CHECK_GALLERY_PERMISSIONS(async (res) => {
  //   if (!res.success) {
  //     console.log('RES', res);
  //     return HelperFunctions.Notify('Error accessing gallery', res.result);
  //   }
  //   HelperFunctions.ImagePicker((image) => {
  //     if (image.uri) uploadProfileImage(image);
  //   });
  // });

  const uploadProfileImage = async (image) => {
    try {
      await HelperFunctions.uploadImage(
        `Profiles/${state.user.uid || auth().currentUser.uid}/${image.fileName}`,
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
            uid: state.user.uid || auth().currentUser.uid,
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' && 'padding'}
      keyboardVerticalOffset={!isKeyboardVisible ? 40 + useSafeAreaInsets().top : 0}
    >
      {/* <React.Fragment> */}
      {/* <Modal isVisible={state.isVisible} closeModal={() => setState({ ...state, isVisible: false })}>
        <PasswordReset />
      </Modal> */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#aaa',
            width: '100%',
            backgroundColor: '#00000045',
            position: 'absolute',
            bottom: 0,
            zIndex: 100
          }}
        >
          <TextInput
            style={{ width: '100%', height: RFValue(50), backgroundColor: '#fff' }}
            placeholder="Enter your new password"
          />
        </View> */}
        <ScrollView style={{ flex: 1, backgroundColor: '#eee', zIndex: 10 }}>
          <View
            style={{
              width: '100%',
              // flexDirection: 'row',
              paddingHorizontal: RFValue(10),
              alignItems: 'center',
              paddingVertical: RFValue(15),
              backgroundColor: '#fff'
            }}
          >
            <ImageBackground
              source={{
                uri: state.user.imageUrl || CONSTANTS.DEFAULT_PROFILE
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
                // borderColor: '#eee',
                // borderWidth: 1,
                marginTop: RFValue(10),
                width: '100%'
                // flexGrow: 1,
                // paddingLeft: RFValue(15)
              }}
            >
              {
                <Text
                  style={{
                    fontSize: RFValue(20),
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    textAlign: 'center'
                  }}
                >
                  {state.user.name || state.user.username || '-'}
                </Text>
              }
              <Text style={{ fontSize: RFValue(14), color: '#aaa', textAlign: 'center' }}>{state.user.email}</Text>
              <Pressable
                onPress={() => navigation.navigate('EditAccount')}
                style={{
                  // borderWidth: 1,
                  backgroundColor: '#010203',
                  marginTop: RFValue(10),
                  height: RFValue(40),
                  // paddingVertical: RFValue(10),
                  width: '50%',
                  alignItems: 'center',
                  // paddingHorizontal: RFValue(20),
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}
              >
                <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>

          <Menus />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Account;
