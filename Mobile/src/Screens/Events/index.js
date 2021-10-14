import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, Alert, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Filters } from '../../Components';
import LoadingModal from '../../Components/LoadingModal';
import Modal from '../../Components/Modal';
import { HelperFunctions } from '../../Utils';
import { THEME_COLOR } from '../../Utils/Constants';
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
    <React.Fragment>
      <LoadingModal isVisible={loading.getEvents} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: RFValue(10),
              marginVertical: RFValue(10)
            }}
          >
            <Text style={{ fontSize: RFValue(30), fontWeight: '700', color: THEME_COLOR }}>Events</Text>
            {user &&
            user.accountType === 'company' && (
              <Pressable
                onPress={() => navigation.navigate('NewEvent')}
                // onPress={() => Alert.alert('Coming soon', 'This feature is fully coming soon, look out for more updates')}
                style={{
                  backgroundColor: THEME_COLOR,
                  width: RFValue(35),
                  height: RFValue(35),
                  borderRadius: RFValue(50),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon name="plus" color="#fff" size={RFValue(25)} />
              </Pressable>
            )}
          </View>
          <View style={{ height: RFValue(40), marginVertical: RFValue(10) }}>
            <Filters />
          </View>
          <View style={{ flexGrow: 1 }}>
            {events && events.length ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: '#eeeeee90' }}
                data={events}
                keyExtractor={() => HelperFunctions.keyGenerator()}
                renderItem={({ item, index }) => (
                  <SingleEvent last={index + 1 === events.length} {...item} {...props} navigation={navigation} />
                )}
              />
            ) : null}
            {events && !events.length ? (
              <View style={{ flex: 1, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
                <Text>No events yet, keep checking...</Text>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Events;
