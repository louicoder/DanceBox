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
  Platform,
  Alert
} from 'react-native';
// import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, DesignIcon } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import SingleBlog from '../Blogs/SingleBlog';
// import SingleEvent from '../Events/SingleEvent';
import auth from '@react-native-firebase/auth';
import Menus from './Menus';
import { LoginPlaceholder, PasswordInput, CommentBox, StickyView, Modal } from '../../Components';
import styles from './Styles';
import ResetPassword from './ResetPassword';
import Profile from './Profile';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({
    image: {},
    progress: 0,
    user: {},
    isVisible: false,
    password: '',
    passVisible: false
  });
  const [ user, setUser ] = React.useState({});
  // const { user } = useSelector((state) => state.Account);
  const [ imageLoading, setImageLoading ] = React.useState(false);
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        // console.log('Re-rendering account...------');
        getUser();
      });
      return () => sub;
    },
    [ navigation ]
  );

  const logout = () => {
    HelperFunctions.removeAsyncObjectData('user', () => {
      dispatch.Account.setUserDetails({});
      setUser({});
      return navigation.navigate('Login', { loginMode: true });
    });
  };

  React.useEffect(() => {
    const KS = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const KH = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      KH.remove();
      KS.remove();
    };
  }, []);

  const getUser = () =>
    HelperFunctions.getUser(({ result: user, success }) => {
      // console.log('Sucess user===', user, success);
      if (success) setUser(user);
    });

  const selectImage = () =>
    HelperFunctions.ImagePicker(({ base64, uri, type, ...rest }) => uri && uploadProfileImage(image));

  const uploadProfileImage = async (image) => {
    try {
      await HelperFunctions.uploadImage(
        `Profiles/${user._id}/${image.fileName}`,
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
        async (imageUrl) => updateAccount(imageUrl)
      );
    } catch (error) {
      setImageLoading(false);
      return HelperFunctions.Notify('Error', error.message);
    }
  };

  const updateAccount = (imageUrl) => {
    dispatch.Account.updateAccountDetails({
      uid: user._id,
      payload: { imageUrl },
      callback: (resp) => {
        // console.log('REsp from update image', resp);
        setImageLoading(false);
        if (resp.error) return HelperFunctions.Notify('Error updating profile photo', resp.result);
        return HelperFunctions.Notify('Success', 'Your profile photo has been updated successfully');
      }
    });
  };

  const resetPassword = () => {
    //
  };

  const isInd = user && user.accountType === 'individual';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={!isKeyboardVisible ? 40 + useSafeAreaInsets().top : 0}
    >
      {/* <React.Fragment> */}
      {/* <Modal isVisible={state.isVisible} closeModal={() => setState({ ...state, isVisible: false })}>
        <PasswordReset />
      </Modal> */}
      {state.passVisible ? (
        <ResetPassword resetPassword={resetPassword} close={() => setState({ ...state, passVisible: false })} />
      ) : null}

      <SafeAreaView style={{ flex: 1 }}>
        {user && user._id ? (
          <ScrollView style={{ flex: 1, backgroundColor: '#eee', zIndex: 10 }}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: user.imageUrl || CONSTANTS.DEFAULT_PROFILE
                }}
                resizeMode="cover"
                style={styles.profilePhoto}
                imageStyle={{ borderRadius: RFValue(100) }}
              >
                <Pressable onPress={selectImage} style={styles.editIconContainer}>
                  <Icon name="pencil" color="#fff" size={RFValue(40)} />
                </Pressable>
              </ImageBackground>
              <View style={styles.nameContainer}>
                {<Text style={styles.name}>{user.name || user.username || '⏤'}</Text>}
                <Text style={styles.email}>{user.email}</Text>
                <Pressable
                  onPress={() =>
                    user.accountType === 'individual'
                      ? navigation.navigate('EditAccount')
                      : Alert.alert(
                          'Still in development',
                          'We are working hard to have organisers update their accounts in app, stay tuned'
                        )}
                  style={styles.editButton}
                >
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </Pressable>
              </View>
            </View>

            {user && (
              <Profile
                resetPassword={() => setState({ ...state, passVisible: true })}
                {...user}
                logout={logout}
                navigation={navigation}
              />
            )}
          </ScrollView>
        ) : (
          <LoginPlaceholder
            login={() => navigation.navigate('Login', { goToScreen: 'Account', loginMode: true })}
            register={() => navigation.navigate('Login', { goToScreen: 'Account', loginMode: false })}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Account;
