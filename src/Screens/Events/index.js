import React from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../Utils';
import SingleEvent from './SingleEvent';

const Events = (props) => {
  const [ state, setState ] = React.useState({ period: null });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: RFValue(10),
            marginVertical: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(30), fontWeight: '700' }}>Events</Text>
          <Pressable
            onPress={() => props.navigation.navigate('NewEvent')}
            style={{
              backgroundColor: '#000',
              width: RFValue(40),
              height: RFValue(40),
              borderRadius: RFValue(50),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="plus" color="#fff" size={RFValue(20)} />
          </Pressable>
        </View>
        <View style={{ height: RFValue(40), marginVertical: RFValue(10) }}>
          <ScrollView
            horizontal
            style={{ height: RFValue(40), paddingHorizontal: RFValue(10) }}
            showsHorizontalScrollIndicator={false}
          >
            {[ 'This week', 'This month', 'Next month', 'This year' ].map((period, index) => (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                style={{
                  paddingHorizontal: RFValue(20),
                  backgroundColor: state.period === index ? '#000' : '#eee',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: RFValue(10),
                  borderRadius: RFValue(20),
                  flexDirection: 'row'
                }}
                onPress={() => setState({ ...state, period: index })}
              >
                {state.period === index && (
                  <Icon name="check" color="#fff" size={RFValue(14)} style={{ marginRight: RFValue(5) }} />
                )}
                <Text style={{ fontSize: RFValue(14), color: state.period === index ? '#fff' : '#000' }}>{period}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexGrow: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            data={events}
            keyExtractor={() => HelperFunctions.keyGenerator()}
            renderItem={({ item }) => <SingleEvent {...item} {...props} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Events;

const events = [
  {
    title: 'Popping Eliminations',
    price: 3000,
    imageUrl: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
    date: '25th July 2021',
    going: 200,
    venue: 'Kanjokya street, Bukoto',
    comments: [ 'the event is going to be fire', 'I liek the venue', 'We are going blazing' ],
    likes: [
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' }
    ]
  },
  {
    title: 'Bboy one on one',
    price: 3000,
    imageUrl: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
    date: '25th July 2021',
    going: 200,
    venue: 'Kanjokya street, Bukoto',
    comments: [ 'the event is going to be fire', 'I liek the venue', 'We are going blazing' ],
    likes: [
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' }
    ]
  },
  {
    title: 'All Styles Breaking Event',
    price: 3000,
    imageUrl: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
    date: '25th July 2021',
    going: 200,
    venue: 'Kanjokya street, Bukoto',
    comments: [ 'the event is going to be fire', 'I liek the venue', 'We are going blazing' ],
    likes: [
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' }
    ]
  },
  {
    title: 'Krump finals',
    price: 3000,
    imageUrl: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
    date: '25th July 2021',
    going: 200,
    venue: 'Kanjokya street, Bukoto',
    comments: [ 'the event is going to be fire', 'I liek the venue', 'We are going blazing' ],
    likes: [
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' }
    ]
  },
  {
    title: 'All Styles Breaking Event',
    price: 3000,
    imageUrl: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
    date: '25th July 2021',
    going: 200,
    venue: 'Kanjokya street, Bukoto',
    comments: [ 'the event is going to be fire', 'I liek the venue', 'We are going blazing' ],
    likes: [
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' },
      { uid: 'fdfsdsdfs', name: 'louis' }
    ]
  }
];
