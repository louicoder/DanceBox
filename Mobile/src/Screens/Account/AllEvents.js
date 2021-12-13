import React from 'react';
import { View, Text, FlatList, Alert, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector, useDispatch } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleEvent from '../Events/SingleEvent';

const AllEvents = ({ navigation, route }) => {
  const { userEvents } = useSelector((state) => state.Events);
  const [ user, setUser ] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log('Route params events', route.params);
    HelperFunctions.getUser(({ result, success }) => {
      if (success) {
        // console.log('User', result);
        setUser(result);
        getUserEvents();
      }
    });
    // getUserEvents()
  }, []);

  const getUserEvents = () =>
    dispatch.Events.getUserEvents({
      uid: user._id,
      callback: ({ success, result }) => !success && Alert.alert('error getting events', result)
    });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>You have no events</Text>
          </View>
        )}
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#eeeeee90' }}
        data={userEvents}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        renderItem={({ item, index }) => (
          <SingleEvent last={userEvents && index + 1 === userEvents.length} {...item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default AllEvents;
