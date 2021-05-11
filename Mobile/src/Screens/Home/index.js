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

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const { randomEvents } = useSelector((state) => state.Events);
  const { blogs } = useSelector((state) => state.Blogs);

  // React.useEffect(() => {
  //   getEvents();
  // }, []);

  React.useEffect(() => {
    const sub = navigation.addListener('focus', () => {
      getRandomEvents();
      getBlogs();
    });

    return () => sub;
  }, []);

  React.useEffect(() => {
    // checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      await HelperFunctions.CHECK_GALLERY_PERMISSIONS((res) => {
        // console.log('Gallery prems', res);
      });
    } catch (error) {
      return HelperFunctions.Notify('Error', error.message);
    }
  };

  const getRandomEvents = () => {
    dispatch.Events.getRandomEvents((res) => {
      // console.log('REs REANDom', res);
    });
  };

  const getBlogs = () => {
    dispatch.Blogs.getBlogs((res) => {
      // console.log('REs EVS', res);
      // setState({...state, blogs})
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

      {/* <ComingSoon
          extStyles={{
            marginHorizontal: RFValue(10),
            width: '95%',
            alignSelf: 'center',
            height: RFValue(300),
            marginVertical: RFValue(10)
          }}
        /> */}
      <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#aaaaaa80' }}>
        <TopCategories navigation={navigation} />
        <View style={{ backgroundColor: '#fff' }}>
          <Text
            style={{
              marginHorizontal: RFValue(10),
              marginVertical: RFValue(15),
              fontSize: RFValue(16),
              fontWeight: 'bold',
              backgroundColor: '#fff'
            }}
          >
            Events you might like:
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
          {randomEvents.slice(0, 4).map((item) => (
            <Pressable
              key={HelperFunctions.keyGenerator()}
              // onPress={() => navigation.navigate('Events', { screen: 'EventProfile', eventId: item._id })}
              style={{
                width: '49.5%',
                height: 49 / 100 * width,
                marginBottom: '1%'
                // height: RFValue(250)
                // marginRight: index + 1 === randomEvents.length ? 0 : RFValue(5)
              }}
            >
              <ImageBackground
                style={{ width: null, height: null, flex: 1 }}
                resizeMode="cover"
                source={{ uri: item.imageUrl || CONSTANTS.EVENTS_PIC }}
              >
                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    padding: RFValue(10),
                    bottom: 0
                  }}
                >
                  <Text style={{ color: '#ffffff90', fontSize: RFValue(14) }}>
                    {item.title.slice(0, 20)}
                    {item.title && item.title.length > 20 && '...'}
                  </Text>
                  {/* <Text style={{ color: '#fff' }}>{item.startDate}</Text> */}
                  {/* <Text style={{ color: '#fff' }}>{item.endDate}</Text> */}
                </View>
              </ImageBackground>
            </Pressable>
          ))}
          {[ ...Array(4 - randomEvents.slice(0, 4).length) ].map(() => (
            <View
              key={HelperFunctions.keyGenerator()}
              style={{
                width: '49.5%',
                height: 49 / 100 * width,
                marginBottom: '1%',
                backgroundColor: '#eee',
                justifyContent: 'center',
                paddingHorizontal: RFValue(10)
                // height: RFValue(250)
                // marginRight: index + 1 === randomEvents.length ? 0 : RFValue(5)
              }}
            >
              <Text style={{ color: '#aaaa', fontSize: RFValue(12), textAlign: 'center' }}>
                More events coming soon, keep checking...
              </Text>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: '#fff', marginTop: RFValue(15), paddingVertical: RFValue(15) }}>
          <Text
            style={{
              marginHorizontal: RFValue(10),
              fontSize: RFValue(16),
              fontWeight: 'bold'
            }}
          >
            Blogs posts you might like:
          </Text>
        </View>

        {blogs &&
          blogs.map((blog) => <SingleBlog key={HelperFunctions.keyGenerator()} {...blog} navigation={navigation} />)}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default Home;
