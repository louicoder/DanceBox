import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Buton, Typo } from '../../Components';
import { HALF_BROWN, HEIGHT, TWO_THIRD_WIDTH, WIDTH } from '../../Utils/Constants';
import { keyGenerator } from '../../Utils/HelperFunctions';

const Route = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View
      style={{
        height: 2.5 / 3 * HEIGHT,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: RFValue(15)
      }}
    >
      <View
        style={{
          height: TWO_THIRD_WIDTH,
          width: TWO_THIRD_WIDTH,
          backgroundColor: HALF_BROWN,
          borderRadius: TWO_THIRD_WIDTH
        }}
      />
      <Typo
        text="Some text here to spice things up before we begin anything"
        style={{ marginVertical: RFValue(20), textAlign: 'center' }}
        size={18}
      />
    </View>
  </View>
);

const renderScene = SceneMap({
  first: Route,
  second: Route,
  third: Route
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
    console.log('Still Running Interval', timer.current);
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
          paddingHorizontal: RFValue(15)
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: RFValue(10) }}
        >
          {[ 0, 1, 2 ].map((r, i) => (
            <Typo key={keyGenerator()} text="●" color={index === i ? '#000000' : '#00000030'} />
          ))}
        </View>
        <Buton
          title="Login to your account"
          extStyles={{ marginVertical: RFValue(5) }}
          onPress={() => navigation.navigate('Login')}
        />
        <Buton
          title="Create account"
          extStyles={{ marginVertical: RFValue(5) }}
          onPress={() => navigation.navigate('Login')}
        />
        {/* <Buton
          title="Continue with google"
          extStyles={{ marginVertical: RFValue(5) }}
          onPress={() => navigation.navigate('Login')}
        /> */}
      </View>
    </View>
  );
}
