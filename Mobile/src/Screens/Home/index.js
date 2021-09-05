import React from 'react';
import { View, Dimensions, ScrollView, Image, Text, Alert, ImageBackground, Pressable, TextInput } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, ComingSoon, Text as TextComp } from '../../Components';
import TopCategories from './TopCategories';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import Organisers from './Organisers';
import EventsInMonth from './EventsInMonth';
import StickyView from '../../Components/StickyView';
import CommentBox from '../../Components/CommentBox';
import { THEME_COLOR } from '../../Utils/Constants';

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

  return (
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <View
        style={{
          marginTop: useSafeAreaInsets().top,
          marginBottom: RFValue(10),
          // borderWidth: 1,
          // backgroundColor: '#fff',
          paddingHorizontal: RFValue(10)
        }}
      >
        <TextComp text="Dance Box" extStyles={{ fontSize: RFValue(30), fontWeight: '700', color: THEME_COLOR }} />
      </View>

      <View style={{ flexGrow: 1 }}>
        <ScrollView
          style={{ flex: 1, width: '100%', backgroundColor: '#eeeeee70' }}
          showsVerticalScrollIndicator={false}
        >
          <TopCategories navigation={navigation} />

          <Organisers navigation={navigation} />

          <EventsInMonth navigation={navigation} />
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Home;
