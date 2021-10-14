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
        Events happening this month:
      </Text>
      {events && events.length ? (
        events.map((event) => <EventPreview key={HelperFunctions.keyGenerator()} {...event} navigation={navigation} />)
      ) : null}
      {events && !events.length ? (
        <Pressable
          // onPress={() => navigation.navigate('AllOrganisers')}
          style={{
            height: RFValue(200),
            paddingHorizontal: RFValue(10),
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>
            There are no events this month but be ssure to keep checking this space for any upcoming events in the
            current month.
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default EventsInMonth;
