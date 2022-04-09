import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Buton, DesignIcon, EventPreview, Filters, ScrollBubbles } from '../../Components';
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

  const renderItem = ({ item, index }) => (
    <EventPreview
      navigation={navigation}
      imageUrl="https://ychef.files.bbci.co.uk/1376x774/p07ztf1q.jpg"
      extStyles={{ marginTop: index === 0 ? RFValue(10) : 0 }}
    />
  );

  // console.log('Events', events && events[0]);
  return (
    <View style={{ flex: 1, borderWidth: 0 }}>
      <View
        style={{
          flexDirection: 'row',
          height: RFValue(35),
          alignItems: 'center',
          justifyContent: 'space-between',
          // paddingHorizontal: RFValue(10),
          backgroundColor: BROWN,
          marginVertical: RFValue(15),
          marginHorizontal: RFValue(8),
          // borderWidth: 1,
          borderColor: GRAY,
          zIndex: 50
        }}
      >
        <DesignIcon name="md-search-outline" pkg="io" extStyles={{ marginHorizontal: RFValue(0) }} />
        <View style={{ flexGrow: 1 }}>
          <Input
            extStyles={{ height: RFValue(35), marginBottom: 0 }}
            extInputStyles={{ height: RFValue(30), marginTop: 0, borderWidth: 0, padding: 0 }}
            placeholder="Search community posts..."
          />
        </View>
        <ActivityIndicator color={GRAY} style={{ flexShrink: 1 }} animating={false} />
      </View>

      <View style={{ flexGrow: 1, zIndex: 10, paddingHorizontal: RFValue(0) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: RFValue(8) }}
          data={[ ...new Array(105).fill() ]}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Events;
