import React from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Buton, DesignIcon, EventPreview, Filters, ScrollBubbles, Typo } from '../../Components';
import LoadingModal from '../../Components/LoadingModal';
import Modal from '../../Components/Modal';
import { Input } from '../../Components';
import { HelperFunctions } from '../../Utils';
import { BLACK, BROWN, GRAY, INTERESTS, THEME_COLOR, WHITE } from '../../Utils/Constants';
import SingleEvent from './SingleEvent';
import { showAlert } from '../../Utils/HelperFunctions';

const Events = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: 'once' });
  // const [ user, setUser ] = React.useState({});
  const { events, postsPagination: { limit } } = useSelector((state) => state.Events);
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ momentum, setMomentum ] = React.useState(false);

  // React.useEffect(
  //   () => {
  //     const sub = navigation.addListener('focus', () => {
  //       getEvents();
  //     });

  //     return () => sub;
  //   },
  //   [ navigation ]
  // );

  React.useEffect(() => {
    getEvents();
  }, []);

  // React.useEffect(() => {
  //   HelperFunctions.getUser(({ success, result }) => success && setUser(result));
  // }, []);

  const getEvents = () => {
    dispatch.Events.getEvents((res) => {
      console.log('Events=============', res);
      if (!res.success) return showAlert('Something went wrong', res.result);
    });
  };

  const renderItem = ({ item, index }) => (
    <EventPreview
      navigation={navigation}
      imageUrl="https://ychef.files.bbci.co.uk/1376x774/p07ztf1q.jpg"
      extStyles={{}}
      {...item}
      event={item}
    />
  );

  const onMomentumScrollBegin = React.useCallback(() => setMomentum(false), [ momentum ]);

  const endReached = React.useCallback(
    () => {
      // console.log('StateXXXXXXXX', state);
      if (!momentum) setMomentum(true);
      getEvents();
    },
    [ setMomentum, getEvents ]
  );

  const onRefresh = () => {
    dispatch.Events.setField('postsPagination', { limit, nextPage: 1, last: false });
    dispatch.Events.setField('events', []);

    getEvents();
    // dispatch.Events.getEvents((res) => {
    //   // console.log('PSOSTS-------', res);
    //   if (!res.success) return showAlert('Something went wrong', res.result);
    //   // setState({ ...state, ...res });
    // });
  };

  // console.log('Events', events && events[0]);
  return (
    <View style={{ flex: 1, borderWidth: 0 }}>
      <Pressable
        onPress={() => navigation.navigate('NewEvent')}
        style={{
          position: 'absolute',
          bottom: RFValue(10),
          right: RFValue(10),
          backgroundColor: THEME_COLOR,
          width: RFValue(50),
          height: RFValue(50),
          borderRadius: RFValue(90),
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 400
        }}
      >
        <DesignIcon name="plus" pkg="ad" onPress={() => navigation.navigate('NewEvent')} color={WHITE} />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          height: RFValue(35),
          marginBottom: RFValue(15),
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: RFValue(10),
          // backgroundColor: BROWN,
          // marginVertical: RFValue(15),
          marginHorizontal: RFValue(8),
          // borderWidth: 1,
          borderColor: GRAY,
          zIndex: 50
        }}
      >
        {/* <DesignIcon name="md-search-outline" pkg="io" extStyles={{ marginHorizontal: RFValue(0) }} />
        <View style={{ flexGrow: 1 }}>
          <Input
            extStyles={{ height: RFValue(35), marginBottom: 0 }}
            extInputStyles={{ height: RFValue(30), marginTop: 0, borderWidth: 0, padding: 0 }}
            placeholder="Search community postsx..."
          />
        </View>
        <ActivityIndicator color={GRAY} style={{ flexShrink: 1 }} animating={false} /> */}
        {[ 'once', 'daily', 'weekly', 'monthly' ].map((r) => {
          const same = state.period === r;
          return (
            <Pressable
              onPress={() => setState({ ...state, period: r })}
              key={HelperFunctions.keyGenerator()}
              style={{
                width: '23%',
                backgroundColor: same ? BLACK : BROWN,
                height: RFValue(35),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: RFValue(50)
              }}
            >
              <Typo
                text={r === 'once' ? 'all' : r}
                onPress={() => setState({ ...state, period: r })}
                style={{ textTransform: 'capitalize' }}
                color={same ? WHITE : BLACK}
              />
            </Pressable>
          );
        })}
      </View>

      <View style={{ flexGrow: 1, zIndex: 10, paddingHorizontal: RFValue(0) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: RFValue(8) }}
          data={events}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={renderItem}
          onEndReached={endReached}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={onMomentumScrollBegin}
          refreshing={loading.getEventPosts || loading.getEvents}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default Events;
