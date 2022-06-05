import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, Dimensions, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, DesignIcon, Typo } from '../../Components';
import EventPreview from '../../Components/EventPreview';
import { HelperFunctions } from '../../Utils';
import randomColor from 'randomcolor';
import { THEME_COLOR, THEME_COLOR5, THEME_COLOR6, THEME_COLOR7, WHITE, WIDTH } from '../../Utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import LoadingModal from '../../Components/LoadingModal';

const { width } = Dimensions.get('window');
const CalendarComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Events);
  const { calendarEvents } = useSelector((state) => state.Events);
  const [ momentum, setMomentum ] = React.useState(false);
  const [ state, setState ] = React.useState({ calendarVisible: false, activeDate: '', markedDates: {}, events: [] });
  const [ filter, setFilter ] = React.useState(moment(new Date()).format('YYYY-MM'));
  const [ day, setDay ] = React.useState('');

  React.useEffect(() => {
    getEventsInMonth(filter);
  }, []);

  const getEventsInMonth = (det) => {
    // console.log('Motnh here', det);
    dispatch.Events.getCalendarEvents({
      filter: det,
      callback: ({ result, success }) => {}
    });
  };

  const renderItem = ({ item, index }) => (
    <EventPreview
      navigation={navigation}
      imageUrl="https://ychef.files.bbci.co.uk/1376x774/p07ztf1q.jpg"
      extStyles={{
        marginTop: index === 0 ? RFValue(10) : 0,
        marginBottom: calendarEvents && calendarEvents.length === index + 1 ? RFValue(70) : RFValue(10),
        width: WIDTH - RFValue(20),
        alignSelf: 'center'
      }}
      {...item}
      event={item}
    />
  );

  const getMarkedDates = () =>
    calendarEvents &&
    calendarEvents.reduce(
      (p, c) => ({
        ...p,
        [moment(c.eventDate).format('YYYY-MM-DD')]: {
          marked: true,
          selected: true
          // selectedColor: randomColor({ luminosity: 'dark' })
        }
      }),
      {}
    );

  const onMomentumScrollBegin = React.useCallback(() => setMomentum(false), [ momentum ]);

  const endReached = React.useCallback(
    () => {
      // console.log('StateXXXXXXXX', state);
      if (!momentum) setMomentum(true);
      getEventsInMonth(filter);
    },
    [ setMomentum, getEventsInMonth ]
  );

  const closeModal = () => setState({ ...state, calendarVisible: false });

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        isVisible={state.calendarVisible}
        closeModal={closeModal}
        extStyles={{ backgroundColor: 'transparent' }}
      >
        <DesignIcon
          name="close"
          color={WHITE}
          extStyles={{ alignSelf: 'flex-end', padding: RFValue(10) }}
          size={30}
          onPress={closeModal}
        />
        {loading.getCalendarEvents ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(10),
              backgroundColor: WHITE
            }}
          >
            <ActivityIndicator
              color="#aaa"
              style={{ marginRight: RFValue(5) }}
              // animating={loading.getCalendarEvents}
            />
            <Typo text="Loading Events in month" size={12} color="#aaa" />
          </View>
        ) : null}

        <Calendar
          style={{ paddingBottom: useSafeAreaInsets().bottom + RFValue(20), marginTop: RFValue(0) }}
          onMonthChange={(month) => {
            const det = month && month.dateString && month.dateString.slice(0, 7);
            // console.log('month changed', det);
            dispatch.Events.setField('calendarEvents', []);
            dispatch.Events.setField('calendarPagination', {
              nextPage: 1,
              limit: 10,
              totalDocuments: 0,
              last: false
            });
            setFilter(det);
            getEventsInMonth(det);
          }}
          current={new Date()}
          markedDates={getMarkedDates()}
          markingType="multi-dot"
          disableMonthChange={loading.getCalendarEvents}
          // onDayPress={(e) => console.log('Date', e)}
          displayLoadingIndicator
          enableSwipeMonths={!loading.getCalendarEvents}
        />
      </BottomSheet>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 400,
          width: '100%'
        }}
      >
        <Pressable
          onPress={() => setState({ ...state, calendarVisible: !state.calendarVisible })}
          style={{
            height: RFValue(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFValue(10),
            alignItems: 'center',
            width: '100%',
            backgroundColor: THEME_COLOR
          }}
        >
          <View
            style={{
              // backgroundColor: '#ffffff50',
              height: RFValue(35),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: RFValue(10)
            }}
          >
            <DesignIcon name="calendar" extStyles={{ marginRight: RFValue(10) }} color={WHITE} />
            <Typo text={'Show events calendar'} color={WHITE} />
          </View>
          <DesignIcon
            pkg="mc"
            color={WHITE}
            // backColor="#ffffff50"
            // withBorder
            // widthHeight={35}
            name={'chevron-up'}
            // size={RFValue(20)}
            onPress={() => setState({ ...state, calendarVisible: !state.calendarVisible })}
          />
        </Pressable>
      </View>

      {!loading.getEventsInMonth && calendarEvents && calendarEvents.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: RFValue(0), flexGrow: 1, backgroundColor: '#fff' }}
          data={calendarEvents}
          keyExtractor={(item) => item._id}
          refreshing={loading.getEventsInMonth}
          onRefresh={() => {
            dispatch.Events.setField('calendarEvents', []);
            dispatch.Events.setField('calendarPagination', {
              nextPage: 1,
              limit: 10,
              totalDocuments: 0,
              last: false
            });
            getEventsInMonth(filter);
          }}
          renderItem={renderItem}
          onEndReached={endReached}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={onMomentumScrollBegin}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Typo text={loading.getCalendarEvents ? 'Loading events...' : 'No events in this month'} color="#aaa" />
        </View>
      )}

      {/*  */}
      {loading.getEventsInMonth ? (
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={RFValue(20)} />
        </View>
      ) : null}
    </View>
  );
};

export default CalendarComponent;
