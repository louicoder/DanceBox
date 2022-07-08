import React from 'react';
import { View, Text, SafeAreaView, Pressable, ActivityIndicator, FlatList, Alert, Keyboard } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Buton, DesignIcon, IconWithText, Typo } from '../../Components';
import Input from '../../Components/Input';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';
import { BLACK, BROWN, GRAY, WIDTH } from '../../Utils/Constants';
import { devAlert, getAsyncObjectData, showAlert, storeAsyncObjectData } from '../../Utils/HelperFunctions';
import SingleBlog from '../Blogs/SingleBlog';
import SingleEvent from '../Events/SingleEvent';

const Search = ({ navigation, ...props }) => {
  const [ state, setState ] = React.useState({
    checked: false,
    agreement: false
  });

  const { events, blogs } = useSelector((state) => state.Search);
  const loading = useSelector((state) => state.loading.effects.Search);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   searchHandler();
  // }, []);

  // React.useLayoutEffect(
  //   () => {
  //     const sub = navigation.addListener(
  //       'focus',
  //       async () =>
  //         await getAsyncObjectData('chat-agree', (res) => {
  //           setState({ ...state, agreement: res.result });
  //           if (res.success) return navigation.navigate('CommunityChat');
  //         })
  //     );

  //     return () => sub;
  //   },
  //   [ navigation ]
  // );

  const searchHandler = () => {
    Keyboard.dismiss();
    setState({ ...state, filterShowing: false });

    const { search, mode } = state;
    // console.log('Searching first time', mode);
    if (!search)
      return Alert.alert(
        'Warning',
        'You cannot perform and empty search, please enter what you would like to search in the search box at the top and continue to search'
      );
    const payload = { search, route: mode, page: 1 };
    dispatch.Search.searchEventsAndBlogs({
      payload,
      callback: (res) => {
        // console.log('RES from search', res);
        const { success, result, ...rest } = res;
        if (success) {
          setState({ ...state, ...rest, done: rest.lastPage });
        }
      }
    });
  };

  const searchMore = () => {
    const { currentPage, search, nextPage, mode } = state;
    const payload = { search, route: mode, page: nextPage };

    dispatch.Search.searchEventsAndBlogs({
      payload,
      callback: (res) => {
        const { success, result, ...rest } = res;
        // console.log('ARE we done------', rest);
        if (res.success) {
          setState({ ...state, ...rest, done: rest.lastPage });
        }
      }
    });
  };

  const acceptTerms = async () =>
    await storeAsyncObjectData('chat-agree', true, (res) => {
      if (!res.success) return showAlert('Failed', res.result);
      dispatch.General.setField('chatAgree', true);
      return navigation.navigate('CommunityChat');
    });

  // console.log('EVEVNTS', blogs);

  const MoreComponent = ({ onPress, loading }) => (
    <Pressable
      style={{ width: '100%', backgroundColor: '#fff', paddingVertical: RFValue(20), alignItems: 'center' }}
      onPress={onPress}
    >
      <Text style={{ color: 'blue' }}>{loading ? 'Loading, please wait...' : 'Load More...'}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DesignIcon name="ios-chatbubble-ellipses-outline" pkg="io" size={100} color={BROWN} />
      <View style={{ width: '100%', paddingHorizontal: 0.06 * WIDTH }}>
        <Typo
          text={`The community chat is a place for all members on the platform to interact in realtime. This is more of a chat with all members on the platform. It's aplace for consultation, sharing, discussion that are meant to be in real time\n`}
        />
        <Typo text={`Instructions on community chat:\n`} size={16} style={{ fontWeight: 'bold' }} />
        <Typo
          text={`1. No Vulgar language or obscenity will be tolerated and if you're are reported by another user you will be suspended from the community place until further notice\n`}
        />
        <Typo text={`2. No bullying of any sort will be tolerated\n`} />
        <Typo
          text={`3. Discussions here are meant for public and therefore for private chats, you will be accomodated with a private chat feature soon\n`}
        />
        <Typo text="Happy communicating with everyone!" />
        <IconWithText
          onPress={() => setState({ ...state, checked: !state.checked })}
          name={state.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          iconStyles={{ color: state.checked ? BLACK : GRAY }}
          pkg="mc"
          text="I agree that I have read the instructions well, understood them and will follow them."
          textCntStyles={{ fontSize: RFValue(14), color: state.checked ? BLACK : GRAY }}
          extStyles={{ marginVertical: RFValue(15) }}
        />
        <Buton title="Continue" disabled={!state.checked} onPress={acceptTerms} />
      </View>
    </View>
  );
};

export default Search;
