import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, Dimensions, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import EventPreview from '../../Components/EventPreview';
import { HelperFunctions } from '../../Utils';
// import LoadingModal from '../../Components/LoadingModal';

const { width } = Dimensions.get('window');
const CalendarComponent = ({ navigation }) => {
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'light-blue' };
  const workout = { key: 'workout', color: 'green' };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Events);

  const [ state, setState ] = React.useState({ calendarVisible: true, activeDate: '', markedDates: {}, events: [] });

  React.useEffect(() => {
    getEventsInMonth();
  }, []);

  const getEventsInMonth = (det) => {
    let dt, mnth, yr, month;
    if (det) {
      month = det.split('-').slice(0, 2).join('-');
      // month
      // console.log('Date here', month);
    } else {
      dt = new Date().toLocaleDateString('en-us').split('/');
      mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
      yr = dt[2];
      month = `${yr}-${mnth}`;
    }

    // console.log('Motnh here', month);
    dispatch.Events.getEventsInMonth({
      month,
      callback: ({ result, success }) => {
        let dates = {};
        if (success) {
          result.map((evnt) => (dates = { ...dates, [evnt.startDate.slice(0, 10)]: { selected: true } }));
          // console.log('HERE marked', result);
          setState({ ...state, markedDates: dates, events: result });
        }
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <LoadingModal isVisible /> */}
      {/* <Modal /> */}
      <Pressable
        onPress={() => setState({ ...state, calendarVisible: !state.calendarVisible })}
        style={{
          height: RFValue(50),
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderWidth: 1,
          paddingHorizontal: RFValue(10),
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: RFValue(16) }}>{state.calendarVisible ? 'Hide Calendar:' : 'Show Calendar:'}</Text>
        <Icon
          name={state.calendarVisible ? 'chevron-up' : 'chevron-down'}
          size={RFValue(20)}
          onPress={() => setState({ ...state, calendarVisible: !state.calendarVisible })}
        />
      </Pressable>
      {state.calendarVisible && (
        <Calendar
          onMonthChange={(month) => {
            // console.log('month changed', month);
            getEventsInMonth(month.dateString);
          }}
          current={new Date()}
          // displayLoadingIndicator
          markedDates={state.markedDates}
          markingType={'multi-dot'}
          // onDayPress={(e) => console.log('Date', e)}
          // displayLoadingIndicator
        />
      )}

      {!loading.getEventsInMonth && state.events && state.events.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                width: '100%',
                padding: RFValue(10),
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: '#eeeeee80'
              }}
            >
              <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>All events in this month:</Text>
            </View>
          )}
          style={{ paddingHorizontal: RFValue(10), marginTop: RFValue(10), flexGrow: 1, backgroundColor: '#fff' }}
          data={state.events}
          keyExtractor={() => Math.random().toString(36).slice(2)}
          renderItem={({ item, index }) => (
            <EventPreview key={HelperFunctions.keyGenerator()} {...item} navigation={navigation} />
            // <View
            //   style={{
            //     width: '100%',
            //     height: RFValue(100),
            //     marginBottom: index + 1 === state.events.length ? 0 : RFValue(10),
            //     backgroundColor: '#eeeeee50',
            //     flexDirection: 'row',
            //     justifyContent: 'space-between'
            //   }}
            // >
            //   <Image
            //     resizeMode="cover"
            //     source={{ uri: uri || 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg' }}
            //     style={{ width: RFValue(100), height: RFValue(100) }}
            //   />
            //   <View
            //     style={{ marginLeft: RFValue(10), flexGrow: 1, paddingVertical: RFValue(10), justifyContent: 'center' }}
            //   >
            //     <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>
            //       {title && title.slice(0, 18)}
            //       {title && title.length > 18 && '...'}
            //     </Text>
            //     <Text style={{ fontSize: RFValue(14) }}>Fee ・ {price ? price : '0'}/=</Text>
            //     {/* <Text style={{ fontSize: RFValue(12), color: '#aaa', paddingVertical: RFValue(0) }}>
            //     Date: {startDate}
            //   </Text> */}
            //     <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>Created ・ {moment(dateCreated).fromNow()}</Text>
            //     <View
            //       style={{
            //         position: 'absolute',
            //         right: RFValue(5),
            //         bottom: RFValue(30),
            //         backgroundColor: '#010203',
            //         padding: RFValue(15),
            //         borderRadius: 30
            //       }}
            //     >
            //       <Text style={{ color: '#fff', fontSize: RFValue(18), fontWeight: 'bold' }}>
            //         {startDate.split('-')[2]}
            //       </Text>
            //     </View>
            //   </View>
            // </View>
          )}
        />
      ) : null}
      {loading.getEventsInMonth ? (
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={RFValue(20)} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default CalendarComponent;
