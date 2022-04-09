import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { DesignIcon, IconWithText } from '../../Components';
import EventPreview from '../../Components/EventPreview';
import OrganiserPreview from '../../Components/OrganiserPreview';
import { CONSTANTS, HelperFunctions } from '../../Utils';

const EventsInMonth = ({ navigation }) => {
  const [ events, setEvents ] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getEventsInMonth();
  }, []);

  const getEventsInMonth = (det) => {
    let dt, mnth, yr, month;

    dt = new Date().toLocaleDateString('en-us').split('/');
    mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
    yr = dt[2];
    month = `${yr}-${mnth}`;

    dispatch.Events.getEventsInMonth({
      month,
      // month: '09',
      callback: ({ result, success }) => {
        // console.log('HERE marked', result);
        let dates = {};
        if (success) {
          result.map((evnt) => (dates = { ...dates, [evnt.startDate.slice(0, 10)]: { selected: true } }));
          setEvents(result);
        }
      }
    });
  };

  // console.log('EVENTS IN MONTH', events);
  return (
    <View
      style={{
        width: '100%',
        marginTop: RFValue(10),
        backgroundColor: '#fff',
        paddingHorizontal: RFValue(10)
      }}
    >
      <Text
        style={{
          marginVertical: RFValue(15),
          fontSize: RFValue(16),
          fontWeight: 'bold',
          backgroundColor: '#fff'
          // color: '#aaa'
        }}
      >
        Events for you:
      </Text>
      {[ ...new Array(2).fill() ].map((event) => (
        <EventPreview
          key={HelperFunctions.keyGenerator()}
          {...event}
          navigation={navigation}
          imageUrl="https://ychef.files.bbci.co.uk/1376x774/p07ztf1q.jpg"
        />
      ))}
    </View>
  );
};

export default EventsInMonth;
