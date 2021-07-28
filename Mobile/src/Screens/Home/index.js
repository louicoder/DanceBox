import React from 'react';
import { View, Dimensions, ScrollView, Image, Text, Alert, ImageBackground, Pressable } from 'react-native';
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

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  // console.log('PROPS HOME', props);
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null, organisers: [], eventsInMonth: [] });
  const { randomOrganisers, user } = useSelector((state) => state.Account);
  const { profile } = useSelector((state) => state.User);
  const { blogs } = useSelector((state) => state.Blogs);

  console.log('PROFILE', user);
  React.useEffect(() => {
    // getRandomOrganisers();
    // getEventsInMonth();
  }, []);

  const getRandomOrganisers = () => {
    dispatch.Account.getRandomOrganisers(({ error, doc: randomOrganisers }) => {
      // console.log('RES----DOC', res.doc);
      if (error) return Alert.alert('Error', error);
      // setState({ ...state, randomOrganisers });
    });
  };

  const getEventsInMonth = (det) => {
    let dt, mnth, yr, month;

    dt = new Date().toLocaleDateString('en-us').split('/');
    mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
    yr = dt[2];
    month = `${yr}-${mnth}`;

    dispatch.Events.getEventsInMonth({
      // month,
      month: '05',
      callback: ({ result, success }) => {
        // console.log('HERE marked', result);
        let dates = {};
        if (success) {
          result.map((evnt) => (dates = { ...dates, [evnt.startDate.slice(0, 10)]: { selected: true } }));
          setState({ ...state, eventsInMonth: result });
        }
      }
    });
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flexGrow: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: RFValue(10),
          marginTop: useSafeAreaInsets().top
        }}
      >
        <View style={{ marginVertical: RFValue(10) }}>
          {/* <TextComp text="Rique Welcome to," extStyles={{ fontSize: RFValue(16) }} /> */}
          {/* <Image source={LOGO} style={{ width: RFValue(40), height: RFValue(40) }} /> */}
          <TextComp text="Dance Box" extStyles={{ fontSize: RFValue(30), fontWeight: '700', color: '#010203' }} />
        </View>
        <Ripple
          rippleContainerBorderRadius={RFValue(25)}
          rippleCentered
          style={{
            height: RFValue(40),
            width: RFValue(40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: RFValue(25),
            backgroundColor: '#010203'
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" size={RFValue(20)} color="#fff" />
        </Ripple>
      </View>

      <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#aaaaaa80' }}>
        <TopCategories navigation={navigation} />

        <Organisers navigation={navigation} />

        <EventsInMonth navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;
