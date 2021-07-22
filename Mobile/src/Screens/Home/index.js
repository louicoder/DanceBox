import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  Text,
  Linking,
  Alert,
  Platform,
  ImageBackground,
  Pressable
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, ComingSoon, Text as TextComp } from '../../Components';
import Header from '../../Components/Header';
import Listing from './Listing';
import TopCategories from './TopCategories';
import LOGO from '../../assets/dancebox-logo.jpg';
import BlogPost from '../../Components/BlogPost';
import { keyGenerator } from '../../Utils/HelperFunctions';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import SingleBlog from '../Blogs/SingleBlog';
import moment from 'moment';
import { QUERIES } from '../../Firebase';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  // console.log('PROPS HOME', props);
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null, organisers: [], eventsInMonth: [] });
  const { randomOrganisers } = useSelector((state) => state.Account);
  const { blogs } = useSelector((state) => state.Blogs);

  React.useEffect(() => {
    getRandomOrganisers();
    getEventsInMonth();
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
        console.log('HERE marked', result);
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

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: RFValue(0),
            paddingVertical: RFValue(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              marginHorizontal: RFValue(10),
              fontSize: RFValue(16),
              fontWeight: 'bold'
            }}
          >
            Events Companies:
          </Text>
          <Pressable
            // onPress={() => Alert.alert('Pending feature', 'This feature is Coming soon')}
            onPress={() => navigation.navigate('AllOrganisers')}
          >
            <Text
              style={{
                marginHorizontal: RFValue(10),
                fontSize: RFValue(14),
                color: 'blue'
                // fontWeight: 'bold'
              }}
            >
              View All
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: '#fff',
            paddingBottom: RFValue(10)
          }}
        >
          {randomOrganisers &&
            randomOrganisers.map(({ companyName, ...rest }, index) => (
              // state.organisers.slice(0, 4).map(({ companyName, ...rest }, index) => (
              <ImageBackground
                key={HelperFunctions.keyGenerator()}
                source={{ uri: rest.imageUrl }}
                style={{ height: RFValue(150), width: '49%', marginBottom: RFValue(6) }}
                imageStyle={{ width: '100%', backgroundColor: '#eeee' }}
                resizeMode="cover"
              >
                <Pressable
                  onPress={() => navigation.navigate('OrganiserProfile', { ...rest, companyName })}
                  style={{ width: '100%', height: RFValue(150) }}
                >
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#010203',
                      height: RFValue(30),
                      position: 'absolute',
                      bottom: 0,
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: RFValue(13),
                        paddingHorizontal: RFValue(5),
                        fontWeight: 'bold'
                      }}
                    >
                      {companyName && companyName.slice(0, 18)}
                      {companyName && companyName.length > 18 && '...'}
                    </Text>
                  </View>
                </Pressable>
              </ImageBackground>
            ))}
        </View>

        <View style={{ backgroundColor: '#fff', marginTop: RFValue(10) }}>
          <Text
            style={{
              marginHorizontal: RFValue(10),
              marginVertical: RFValue(15),
              fontSize: RFValue(16),
              fontWeight: 'bold',
              backgroundColor: '#fff'
            }}
          >
            Events this month:
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'flex-start',
            flex: 1,
            backgroundColor: '#fff',
            paddingBottom: RFValue(15)
          }}
        >
          {state.eventsInMonth &&
            state.eventsInMonth.map((item) => (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                onPress={() => navigation.navigate('Events', { screen: 'EventProfile', params: { _id: item._id } })}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: RFValue(10)
                }}
              >
                <Image
                  source={{ uri: item.imageUrl || CONSTANTS.EVENTS_PIC }}
                  style={{ width: RFValue(80), height: RFValue(80) }}
                />
                <View style={{ flexGrow: 1, paddingHorizontal: RFValue(10) }}>
                  <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontSize: RFValue(12), marginVertical: RFValue(5) }}>Date ・ {item.startDate}</Text>
                  <Text style={{ fontSize: RFValue(12), marginBottom: RFValue(5), fontWeight: 'bold' }}>
                    Fee ・ {item.price ? item.price : 'FREE'}
                  </Text>

                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    {item.tags &&
                      item.tags.map((tg) => (
                        <Text
                          key={HelperFunctions.keyGenerator()}
                          style={{
                            padding: RFValue(3),
                            backgroundColor: '#01020320',
                            marginRight: RFValue(10),
                            borderRadius: 20
                          }}
                        >
                          #{tg}
                        </Text>
                      ))}
                  </View>
                </View>
                <View />
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default Home;
