import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const EndDate = ({ date, setDate, closeModal }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: RFValue(10)
        }}
      >
        <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Select the end date for the event</Text>
        <Icon name="close" size={RFValue(20)} style={{}} onPress={closeModal} />
      </View>
      <Calendar
        current={date}
        minDate={new Date()}
        enableSwipeMonths={true}
        onDayPress={({ dateString }) => setDate('endDate', dateString)}
        markedDates={{ [moment(date).format('YYYY-MM-DD')]: { selected: true } }}
      />
    </View>
  );
};

export default EndDate;
