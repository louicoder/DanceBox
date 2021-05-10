import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import SingleEvent from '../Events/SingleEvent';

const AllEvents = ({ navigation }) => {
  const { events } = useSelector((state) => state.Account);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#eeeeee90' }}
        data={events}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        renderItem={({ item, index }) => (
          <SingleEvent last={index + 1 === events.length} {...item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default AllEvents;
