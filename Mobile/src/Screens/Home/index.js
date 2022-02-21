import React from 'react';
import { View, Dimensions, ScrollView, Text, Alert, ImageBackground, Pressable, TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, ComingSoon, DesignIcon, ScrollBubbles, Text as TextComp, Typo } from '../../Components';
import TopCategories from './TopCategories';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import Organisers from './Organisers';
import EventsInMonth from './EventsInMonth';
import StickyView from '../../Components/StickyView';
import CommentBox from '../../Components/CommentBox';
import Image from 'react-native-fast-image';
import { BROWN, INTERESTS, THEME_COLOR } from '../../Utils/Constants';

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  // console.log('PROPS HOME', props);
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null, organisers: [], eventsInMonth: [] });
  const { user } = useSelector((state) => state.Account);
  const { profile } = useSelector((state) => state.User);
  const { blogs } = useSelector((state) => state.Blogs);

  // console.log('IN MONTH', state.eventsInMonth);
  React.useEffect(() => {
    // getRandomOrganisers();
    // getEventsInMonth();
  }, []);

  console.log('USER', user);

  // const getEventsInMonth = (det) => {
  //   let dt, mnth, yr, month;

  //   dt = new Date().toLocaleDateString('en-us').split('/');
  //   mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
  //   yr = dt[2];
  //   month = `${yr}-${mnth}`;

  //   dispatch.Events.getEventsInMonth({
  //     // month,
  //     month: '05',
  //     callback: ({ result, success }) => {
  //       // console.log('HERE marked', result);
  //       let dates = {};
  //       if (success) {
  //         result.map((evnt) => (dates = { ...dates, [evnt.startDate.slice(0, 10)]: { selected: true } }));
  //         setState({ ...state, eventsInMonth: result });
  //       }
  //     }
  //   });
  // };

  const selectBubble = React.useCallback((selectedBubble) => setState({ ...state, selectedBubble }), [
    state.selectedBubble
  ]);

  return (
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <View
        style={{
          marginTop: useSafeAreaInsets().top + RFValue(10),
          marginBottom: RFValue(10),
          // borderWidth: 1,
          // backgroundColor: '#fff',
          paddingHorizontal: RFValue(10),
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            height: RFValue(35),
            width: RFValue(35),
            borderRadius: 50,
            backgroundColor: BROWN,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {user && user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: '100%', height: '100%', borderRadius: RFValue(100) }}
            />
          ) : (
            <DesignIcon name="user" pkg="ad" />
          )}
        </View>
        <View style={{ flexGrow: 1, marginLeft: RFValue(10) }}>
          <Typo text="Welcome back," size={12} />
          <Typo text={user.userName || user.email} size={12} style={{ fontWeight: 'normal', textTransform: 'none' }} />
        </View>
        {/* <DesignIcon withBorder={false} name="bell-outline" pkg="mc" widthHeight={35} /> */}
        <DesignIcon withBorder={false} name="dots-vertical" pkg="mc" widthHeight={35} />
        {/* <DesignIcon name="user" pg="ad" /> */}
      </View>
      {/* </SafeAreaView> */}

      <ScrollView style={{ flexGrow: 1, width: '100%', backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <TopCategories navigation={navigation} />

        <Organisers navigation={navigation} />

        <EventsInMonth navigation={navigation} />
      </ScrollView>
      {/* <View style={{ flexGrow: 1 }}>
      </View> */}
    </View>
  );
};

export default Home;
