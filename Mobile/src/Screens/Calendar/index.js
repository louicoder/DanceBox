import moment from 'moment';
import React from 'react';
import { View, Text, SafeAreaView, Dimensions, FlatList, Image, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
// import LoadingModal from '../../Components/LoadingModal';

const { width } = Dimensions.get('window');
const CalendarComponent = () => {
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'light-blue' };
  const workout = { key: 'workout', color: 'green' };
  const dispatch = useDispatch();

  const [ state, setState ] = React.useState({ calendarVisible: true, activeDate: '', markedDates: {}, events: [] });

  React.useEffect(() => {
    getEventsInMonth();
  }, []);

  const getEventsInMonth = (det) => {
    let dt, mnth, yr, month;
    if (det) {
      month = det.split('-').slice(0, 2).join('-');
      // month
      console.log('Date here', month);
    } else {
      dt = new Date().toLocaleDateString('en-us').split('/');
      mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
      yr = dt[2];
      month = `${yr}-${mnth}`;
    }

    console.log('Motnh here', month);
    dispatch.Events.getEventsInMonth({
      month,
      callback: ({ result, success }) => {
        let dates = {};
        if (success) {
          result.map((evnt) => (dates = { ...dates, [evnt.startDate.slice(0, 10)]: { selected: true } }));
          console.log('HERE marked', result);
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
        <Text style={{ fontSize: RFValue(16) }}>
          {state.calendarVisible ? 'Hide Events Calendar:' : 'Show Events Calendar:'}
        </Text>
        <Icon
          name={state.calendarVisible ? 'chevron-up' : 'chevron-down'}
          size={RFValue(20)}
          onPress={() => setState({ ...state, calendarVisible: !state.calendarVisible })}
        />
      </Pressable>
      {state.calendarVisible && (
        <Calendar
          onMonthChange={(month) => {
            console.log('month changed', month);
            getEventsInMonth(month.dateString);
          }}
          current={new Date()}
          // displayLoadingIndicator
          markedDates={state.markedDates}
          markingType={'multi-dot'}
          onDayPress={(e) => console.log('Date', e)}
        />
      )}

      <FlatList
        ListHeaderComponent={() => null}
        style={{ paddingHorizontal: RFValue(0), marginTop: RFValue(10), flexGrow: 1, backgroundColor: '#eee' }}
        data={state.events}
        keyExtractor={() => Math.random().toString(36).slice(2)}
        renderItem={({ item: { imageUrl: uri, title, price, startDate, dateCreated }, index }) => (
          <View
            style={{
              width: '100%',
              height: RFValue(100),
              marginBottom: RFValue(10),
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Image
              source={{ uri: uri || 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg' }}
              style={{ width: RFValue(100), height: RFValue(100) }}
            />
            <View style={{ marginLeft: RFValue(10), flexGrow: 1, paddingVertical: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>{title}</Text>
              <Text style={{ fontSize: RFValue(14), color: '#aaa', paddingVertical: RFValue(0) }}>
                Date: {startDate}
              </Text>
              <Text style={{ fontSize: RFValue(14) }}>Fee ・ {price ? price : '0'}/=</Text>
              <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>Created ・ {moment(dateCreated).fromNow()}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CalendarComponent;
