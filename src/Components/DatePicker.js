import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatePicker = ({ extStyles, setDate, title }) => {
  const [ state, setState ] = React.useState({
    date: moment(new Date()).format('YYYY-MM-DD'),
    datePickerVisible: false
  });
  return (
    <View style={[ extStyles ]}>
      <Text style={{ marginHorizontal: RFValue(10), fontSize: RFValue(14), marginTop: RFValue(10) }}>
        {title || 'Select event date'}
      </Text>

      <View
        style={{
          height: RFValue(50),
          margin: RFValue(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Pressable
          onPress={() => setState({ ...state, datePickerVisible: !state.datePickerVisible })}
          style={{
            flexGrow: 1,
            backgroundColor: '#eee',
            height: '100%',
            paddingHorizontal: RFValue(10),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: RFValue(16) }}>
            {state.date ? moment(state.date).format('D/MMMM/YYYY') : 'Click to select a date'}
          </Text>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Icon name={state.datePickerVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(20)} style={{}} />
          </View>
        </Pressable>
        <View
          style={{
            width: RFValue(50),
            backgroundColor: '#000',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="calendar-month-outline" size={RFValue(25)} color="#fff" />
        </View>
      </View>

      {/* {state.datePickerVisible && (
        <Calendar
          current={moment(state.date).format('YYYY-MM-DD')}
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          enableSwipeMonths={true}
          onDayPress={({ dateString }) => {
            setState({ ...state, date: dateString, datePickerVisible: false });
            setDate(dateString);
          }}
          markedDates={{ [moment(state.date).format('YYYY-MM-DD')]: { selected: true } }}
        />
      )} */}
    </View>
  );
};

export default DatePicker;
