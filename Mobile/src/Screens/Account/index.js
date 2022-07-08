import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, DesignIcon, Typo } from '../../Components';
import {
  BLACK,
  BROWN,
  GRAY,
  GREEN,
  HEIGHT,
  SHADOW,
  THEME_COLOR,
  THEME_COLOR3,
  THEME_COLOR5,
  WHITE
} from '../../Utils/Constants';
import Image from 'react-native-fast-image';
import { abbreviateNumber, keyGenerator, showAlert } from '../../Utils/HelperFunctions';
import { hideMessage, showMessage } from 'react-native-flash-message';
import Feedback from './Feedback';
import EditPhoto from './EditPhoto';

const Account = ({ navigation }) => {
  const { user } = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ comp: '', ...user });
  // const [Account, setAccount] = React.useState({...user})
  const [ isVisible, setIsVisible ] = React.useState(false);

  React.useEffect(() => {
    // dispatch.Account.getUserDetails({ uid: user.uid, callback: () => {} });
  }, []);

  const logout = () => {
    showMessage({
      // description: 'Please wait while we log you out',
      message: 'Logging out',
      titleStyle: { fontSize: RFValue(14) },
      renderCustomContent: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: RFValue(10) }}>
          <ActivityIndicator color={WHITE} style={{ marginRight: RFValue(10) }} />
          <Typo text="Please wait while we log you out of your account..." size={12} color={WHITE} />
        </View>
      ),
      autoHide: false,
      hideOnPress: false
    });

    dispatch.Account.logout({
      callback: (res) => {
        hideMessage();
        if (!res.success)
          return showAlert(
            'Unable to logout at this time',
            `we apologise something went wrong while trying to logout you out of your account, please try again ::: \n ${res.result}`
          );
        return navigation.push('Login');
      }
    });
  };

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  const confirmLogout = () =>
    showMessage({
      message: 'Are you sure you want to logout?',
      style: { backgroundColor: THEME_COLOR },
      titleStyle: { fontSize: RFValue(16) },
      position: 'bottom',
      duration: 5000,
      // autoHide: false,
      hideOnPress: false,
      renderCustomContent: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: RFValue(15)
          }}
        >
          {[
            {
              title: 'Yes',
              onPress: () => {
                logout();
                // hideMessage();
              }
            },
            { title: 'Cancel', onPress: () => hideMessage() }
          ].map((r) => (
            <Pressable
              key={keyGenerator()}
              onPress={r.onPress}
              style={{
                width: '48%',
                height: RFValue(40),
                borderWidth: 1,
                borderColor: WHITE,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typo text={r.title} size={18} style={{ textTransform: 'capitalize' }} color={WHITE} />
            </Pressable>
          ))}
        </View>
      )
    });

  const devMode = () =>
    showAlert(
      'Still in development',
      'We are working hard to have all these features ready for use very soon, thank you!'
    );

  const RenderModalContent = ({ comp, closeModal }) => {
    switch (comp) {
      case 'feedback':
        return <Feedback closeModal={closeModal} />;
      case 'photo':
        return <EditPhoto closeModal={closeModal} />;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={isVisible} closeModal={closeModal} extStyles={{ top: 0 }}>
        <View style={{ height: '100%' }}>
          <RenderModalContent comp={state.comp} closeModal={closeModal} />
        </View>
      </BottomSheet>
      <ScrollView style={{ flexGrow: 1, backgroundColor: BROWN }}>
        <View
          style={{
            alignItems: 'center',
            padding: RFValue(0),
            backgroundColor: WHITE,
            paddingTop: RFValue(20),
            paddingTop: useSafeAreaInsets().top + RFValue(20)
            // borderWidth: 1
          }}
        >
          <View
            style={{
              width: RFValue(100),
              height: RFValue(100),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: WHITE,
              marginBottom: RFValue(10)
              // borderWidth: 1
            }}
          >
            <Pressable
              onPress={devMode}
              style={{
                backgroundColor: WHITE,
                zIndex: 50,
                position: 'absolute',
                borderRadius: RFValue(100),
                right: RFValue(15),
                right: 0,
                bottom: 0,
                zIndex: 100,
                ...SHADOW,
                shadowOffset: { width: 0, height: RFValue(5) },
                shadowRadius: RFValue(8),
                shadowColor: '#000',
                elevation: RFValue(15)
                // top: useSafeAreaInsets().top + RFValue(15)
              }}
            >
              <DesignIcon
                name="camera"
                pkg="ft"
                withBorder
                style={{}}
                backColor={WHITE}
                size={22}
                color={GREEN}
                onPress={() => {
                  setIsVisible(true);
                  setState({ ...state, comp: 'photo' });
                }}
              />
            </Pressable>
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 1 / 2 * HEIGHT,
                  zIndex: 5
                  // ...SHADOW,
                  // shadowColor: BLACK,
                  // elevation: RFValue(15)
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  ...SHADOW,
                  width: RFValue(100),
                  height: RFValue(100),
                  borderRadius: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  shadowOpacity: 0.2
                }}
              >
                <DesignIcon
                  color={GREEN}
                  name="user"
                  pkg="ad"
                  size={RFValue(50)}
                  style={{
                    // borderWidth: 1,
                    padding: RFValue(15),
                    borderRadius: RFValue(80),
                    backgroundColor: WHITE
                    // ...SHADOW,
                    // shadowColor: GRAY,
                    // elevation: RFValue(10)
                  }}
                />
              </View>
            )}
          </View>

          <Typo
            text={user.name || user.username || ''}
            style={{ textTransform: 'capitalize', fontWeight: 'bold', marginVertical: RFValue(0) }}
            size={18}
            color={BLACK}
            // lines={1}
          />
          <Typo text={`${user.email}`} style={{ marginVertical: RFValue(0) }} size={12} color={GRAY} />
          <Typo
            text={`${user.followers && abbreviateNumber(user.followers.length)} Followers  |  ${user.following &&
              abbreviateNumber(user.following.length)} Following`}
            style={{ marginVertical: RFValue(0) }}
            size={14}
            // color={GRAY}
          />

          <Typo
            text=""
            style={{ marginVertical: RFValue(0) }}
            size={12}
            color={GRAY}
            // lines={1}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            // height: RFValue(300),
            marginVertical: RFValue(10),
            // paddingVertical: RFValue(10),
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {[
            // { title: 'followers', caption: '0', hidden: false },
            // { title: 'following', caption: '0' },
            // { title: 'Posts', caption: '0' },
            // { title: 'about you', icon: true, name: 'ios-information-circle-outline', pkg: 'io' },
            {
              title: 'settings',
              icon: true,
              name: 'setting',
              active: true,
              onPress: () => navigation.navigate('Settings')
            },
            {
              title: 'Edit profile',
              active: true,
              icon: true,
              name: 'form',
              pkg: 'ad',
              onPress: () => navigation.navigate('EditProfile')
            },
            { title: 'favorites', name: 'bookmark-outline', icon: true, pkg: 'mc' },
            { title: 'Invite a friend', icon: true, name: 'share-social-outline', pkg: 'io' },
            { title: 'Terms & conditions', icon: true, name: 'document-text-outline', pkg: 'io' },
            { title: 'user agreement', icon: true, name: 'documents-outline', pkg: 'io' },
            // { title: 'Wallet', icon: true, name: 'wallet-outline', pkg: 'io' },
            {
              title: 'Feedback',
              icon: true,
              name: 'md-chatbox-ellipses-outline',
              pkg: 'io',
              onPress: () => {
                setIsVisible(true);
                setState({ ...state, comp: 'feedback' });
              },
              active: true
            },
            { title: 'Logout', icon: true, name: 'lock', pkg: 'sim', onPress: () => confirmLogout(), active: true }
          ].map(
            (r, index) =>
              !r.hidden ? (
                <Pressable
                  key={keyGenerator()}
                  onPress={() => (r.onPress ? r.onPress() : devMode())}
                  style={{
                    width: '33.33%',
                    height: RFValue(100),
                    // borderWidth: 1,
                    borderRightWidth: [ 1, 4, 6, 7, 12, 9, 10 ].includes(index) ? 1 : 0,
                    borderLeftWidth: [ 1, 4, 6, 12 ].includes(index) ? 1 : 0,
                    borderColor: THEME_COLOR5,
                    // borderBottomWidth: [].includes : 0,
                    borderBottomWidth: index > 5 ? 0 : 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!r.icon ? (
                    <Typo text={r.caption} size={25} style={{ fontWeight: 'bold' }} color={GREEN} />
                  ) : (
                    <DesignIcon name={r.name} pkg={r.pkg || 'ad'} color={r.active ? BLACK : THEME_COLOR3} size={40} />
                  )}
                  <Typo
                    text={r.title}
                    color={r.active ? BLACK : THEME_COLOR3}
                    style={{ textTransform: 'capitalize' }}
                    size={11}
                  />
                </Pressable>
              ) : null
          )}
        </View>
        <View style={{ backgroundColor: '#fff' }} />
      </ScrollView>
    </View>
  );
};

export default Account;
