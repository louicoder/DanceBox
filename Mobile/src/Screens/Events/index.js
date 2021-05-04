import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, Alert, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import Modal from '../../Components/Modal';
import { HelperFunctions } from '../../Utils';
import SingleEvent from './SingleEvent';

const Events = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ period: null });
  const { events } = useSelector((state) => state.Events);
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
    checkPermissions();
  }, []);

  const getEvents = () => {
    dispatch.Events.getEvents((response) => {
      // console.log('Events', response);
    });
  };

  const checkPermissions = async () => {
    try {
      await HelperFunctions.CHECK_GALLERY_PERMISSIONS((res) => {
        // console.log('Gallery prems', res);
        if (!res.success) {
          return HelperFunctions.Notify(
            'Error',
            'You need to grant DAncebox permissions to access your gallery so you can upload images '
          );
          // return navigate('Home');
        }
        // return navigate('Home');
      });
    } catch (error) {
      return HelperFunctions.Notify('Error', error.message);
    }
  };

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
            <Text style={{ fontSize: RFValue(30), fontWeight: '700' }}>Events</Text>
            <Pressable
              onPress={() => navigation.navigate('NewEvent')}
              // onPress={() => Alert.alert('Coming soon', 'This feature is fully coming soon, look out for more updates')}
              style={{
                backgroundColor: '#000',
                width: RFValue(40),
                height: RFValue(40),
                borderRadius: RFValue(50),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="plus" color="#fff" size={RFValue(20)} />
            </Pressable>
          </View>
          <View style={{ height: RFValue(40), marginVertical: RFValue(10) }}>
            <ScrollView
              horizontal
              style={{ height: RFValue(40), paddingHorizontal: RFValue(10) }}
              showsHorizontalScrollIndicator={false}
            >
              {[ 'This week', 'This month', 'Next month', 'This year' ].map((period, index) => (
                <Pressable
                  key={HelperFunctions.keyGenerator()}
                  style={{
                    paddingHorizontal: RFValue(20),
                    backgroundColor: state.period === index ? '#000' : '#eee',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: RFValue(10),
                    borderRadius: RFValue(20),
                    flexDirection: 'row'
                  }}
                  onPress={() => setState({ ...state, period: index })}
                >
                  {state.period === index && (
                    <Icon name="check" color="#fff" size={RFValue(14)} style={{ marginRight: RFValue(5) }} />
                  )}
                  <Text style={{ fontSize: RFValue(14), color: state.period === index ? '#fff' : '#000' }}>
                    {period}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View style={{ flexGrow: 1 }}>
            {events && events.length ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: '#aaaaaa80' }}
                data={events}
                keyExtractor={() => HelperFunctions.keyGenerator()}
                renderItem={({ item }) => <SingleEvent {...item} {...props} navigation={navigation} />}
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
