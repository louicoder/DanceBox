import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleEvent from '../Events/SingleEvent';

const AllEvents = ({ navigation }) => {
  const { events } = useSelector((state) => state.Account);
  return (
    <View style={{ flex: 1 }}>
      {events && events.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: '#eeeeee90' }}
          data={events}
          keyExtractor={() => HelperFunctions.keyGenerator()}
          renderItem={({ item, index }) => (
            <SingleEvent last={index + 1 === events.length} {...item} navigation={navigation} />
          )}
        />
      ) : null}
      {events && !events.length ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>You have no events</Text>
        </View>
      ) : null}
    </View>
  );
};

export default AllEvents;
