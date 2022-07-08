import * as React from 'react';
import { View, useWindowDimensions, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Buton, Typo } from '../../Components';
import { HALF_BROWN, HEIGHT, TWO_THIRD_WIDTH, WHITE, WIDTH } from '../../Utils/Constants';
import { keyGenerator } from '../../Utils/HelperFunctions';
import Image from 'react-native-fast-image';
import Dance from '../../assets/dance1.jpg';
import Calendar from '../../assets/calendar.jpg';
import Community from '../../assets/community.jpg';

const Route = (image, styles, title, caption) => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View
      style={{
        height: HEIGHT
        // borderWidth: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
        // paddingHorizontal: RFValue(15)
        // backgroundColor: 'green'
      }}
    >
      <View
        style={{
          // borderWidth: 1,
          height: '100%',
          width: '100%',
          backgroundColor: HALF_BROWN
          // borderRadius: TWO_THIRD_WIDTH
        }}
      >
        <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: useSafeAreaInsets().bottom + RFValue(100),
          paddingHorizontal: RFValue(10)
          // borderWidth: 1
        }}
      >
        <Typo text={title} style={{ marginVertical: RFValue(0), fontWeight: 'bold', ...styles }} size={25} />
        <Typo text={caption} style={{ marginVertical: RFValue(0), ...styles }} size={16} />
      </View>
    </View>
  </View>
);

const renderScene = SceneMap({
  first: () =>
    Route(
      Dance,
      {},
      'Connect with Dancers globally',
      'Signup and connect with other dancers allover the continent, do not miss the vibes'
    ),
  second: () =>
    Route(Calendar, { color: WHITE }, 'Create dance events', 'Create events and let people know so they can attend'),
  third: () =>
    Route(
      Community,
      { color: WHITE },
      'Join the community online',
      'Join the dance community online and get in touch with other dances'
    )
});

let delay = 2000;
export default function Intro ({ navigation }) {
  const [ index, setIndex ] = React.useState(0);
  const timer = React.useRef(null);

  const [ routes ] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' }
  ]);

  React.useEffect(() => {
    // timer.current = timer && setInterval(setNewIndex, delay);
    // return () => {
    //   return clearInterval(timer.current);
    // };
  }, []);

  const setNewIndex = () => {
    // this log below continues to run even when I clear the interval in the cleanup function in the useEffect.
    // How do I know it's clear. The log runs but with a different interval Id from the reference on timer I created above
    // console.log('Still Running Interval', timer.current);
    return setIndex((r) => (r !== 2 ? r + 1 : 0));
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        renderTabBar={() => null}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: WIDTH }}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          bottom: useSafeAreaInsets().bottom,
          paddingHorizontal: RFValue(15),
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable
          style={{
            opacity: index > 0 ? 1 : 0,
            backgroundColor: 'transparent',
            padding: RFValue(10),
            borderRadius: RFValue(20)
          }}
          onPress={() => (index > 0 ? setIndex(index - 1) : null)}
        >
          <Typo text="Back" style={{ fontWeight: 'bold' }} size={16} color={index === 0 ? '#000' : '#fff'} />
        </Pressable>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: RFValue(10) }}
        >
          {[ 0, 1, 2 ].map((r, i) => (
            <Typo
              style={{ marginHorizontal: RFValue(2) }}
              key={keyGenerator()}
              text="●"
              color={index === i ? '#000000' : '#00000030'}
            />
          ))}
        </View>
        <Pressable
          style={{ backgroundColor: 'transparent', padding: RFValue(10), borderRadius: RFValue(20) }}
          onPress={() => (index < 2 ? setIndex(index + 1) : navigation.navigate('Signup'))}
        >
          <Typo
            text={index === 2 ? 'Finish' : 'Next'}
            style={{ fontWeight: 'bold' }}
            size={16}
            color={index === 0 ? '#000' : '#fff'}
          />
        </Pressable>
      </View>
    </View>
  );
}
