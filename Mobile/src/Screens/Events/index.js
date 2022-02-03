import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, Alert, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Buton, DesignIcon, Filters, ScrollBubbles } from '../../Components';
import LoadingModal from '../../Components/LoadingModal';
import Modal from '../../Components/Modal';
import { Input } from '../../Components';
import { HelperFunctions } from '../../Utils';
import { BROWN, GRAY, INTERESTS, THEME_COLOR, WHITE } from '../../Utils/Constants';
import SingleEvent from './SingleEvent';

const Events = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null });
  const [ user, setUser ] = React.useState({});
  const { events } = useSelector((state) => state.Events);
  // const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Events);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        getEvents();
      });

      return () => sub;
    },
    [ navigation ]
  );

  React.useEffect(() => {
    HelperFunctions.getUser(({ success, result }) => success && setUser(result));
  }, []);

  const getEvents = () => {
    dispatch.Events.getEvents((response) => {
      // console.log('Events', response);
    });
  };

  // console.log('Events', events && events[0]);
  return (
    <View style={{ flex: 1, borderWidth: 0 }}>
      <Buton
        title="Create Event"
        extStyles={{
          position: 'absolute',
          bottom: RFValue(10),
          zIndex: 30,
          // width: 0.4 * WIDTH,
          height: RFValue(40),
          right: RFValue(8),
          backgroundColor: THEME_COLOR
        }}
      >
        <DesignIcon name="calendar" color={WHITE} style={{ marginRight: RFValue(10) }} />
      </Buton>

      <View
        style={{
          flexDirection: 'row',
          height: RFValue(30),
          // borderWidth: 1,
          // width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: RFValue(10),
          // paddingLeft: RFValue(10),
          backgroundColor: BROWN,
          marginBottom: RFValue(15),
          borderBottomWidth: 1,
          borderColor: GRAY,
          paddingRight: 0,
          // position: 'relative',
          zIndex: 50
        }}
      >
        <DesignIcon name="magnify" pkg="mc" extStyles={{ marginHorizontal: RFValue(10) }} />
        <Input
          extStyles={{ height: RFValue(30), marginBottom: 0, flexShrink: 1 }}
          extInputStyles={{ height: RFValue(30), marginTop: 0, borderWidth: 0, paddingLeft: 0 }}
          placeholder="search community events..."
        />
        {/* :TODO: suggestions drop down */}
      </View>

      <View style={{ flexGrow: 1, zIndex: 10 }}>
        {events && events.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            data={events}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item, index }) => (
              <SingleEvent last={index + 1 === events.length} {...item} {...props} navigation={navigation} />
            )}
          />
        ) : null}
        {events && !events.length ? (
          <View style={{ flex: 1, backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No events yet, keep checking...</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Events;
