import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DesignIcon, IconWithText } from '../../Components';
import EventPreview from '../../Components/EventPreview';
import OrganiserPreview from '../../Components/OrganiserPreview';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { showAlert } from '../../Utils/HelperFunctions';

const EventsInMonth = ({ navigation }) => {
  const [ events, setEvents ] = React.useState([]);
  const dispatch = useDispatch();
  const { randomEvents } = useSelector((st) => st.Events);
  React.useEffect(() => {
    getEventsInMonth();
  }, []);

  const getEventsInMonth = (det) => {
    let dt, mnth, yr, month;

    dt = new Date().toLocaleDateString('en-us').split('/');
    mnth = dt[0].length === 1 ? `0${dt[0]}` : dt[0];
    yr = dt[2];
    month = `${yr}-${mnth}`;

    dispatch.Events.getRandomEvents({
      size: 2,
      callback: ({ result, success }) => {
        // console.log('HERE marked', result);
        // let dates = {};
        if (!success) return showAlert('Something went wrong', result, 'danger');
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
      {randomEvents.map((event) => (
        <EventPreview
          key={HelperFunctions.keyGenerator()}
          {...event}
          navigation={navigation}
          // imageUrl="https://ychef.files.bbci.co.uk/1376x774/p07ztf1q.jpg"
          event={event}
        />
      ))}
    </View>
  );
};

export default EventsInMonth;
