import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { DesignIcon, Typo } from '../../Components';
import { RFValue } from 'react-native-responsive-fontsize';
import { keyGenerator } from '../../Utils/HelperFunctions';
import { BLACK, BROWN, GRAY, HALF_GRAY, WHITE } from '../../Utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../Components/Header';

const Professions = ({ professions, setProfessions, closeModal }) => {
  console.log('Professions', professions);
  // const [ professions, setProfessions ] = React.useState([]);
  const pros = [
    // 'dancer',
    // 'visual artist',
    // 'musician',
    // 'mc',
    // 'choreographer',
    // 'fitness instructor',
    // 'dj',
    // 'photographer',
    // 'videographer',
    // 'beatboxer',
    // 'contemporary dancer',
    // 'tranditional dancer',
    // 'dance instructor',
    // 'Ticketing'
    {
      title: 'Event Organiser',
      value: 'organiser',
      categories: [ 'battles', 'championships', 'dance offs', 'casting' ]
    },
    {
      title: 'Dancer',
      value: 'dancer',
      categories: [ 'contemporary', 'krump', 'bboying', 'popping and locking', 'traditional dances', 'house', 'Crew' ]
    },
    {
      title: 'Fitness Instructor',
      value: 'fitness',
      categories: [ 'battle coach', 'championships', 'dance styles instructor' ]
    },
    {
      title: 'Visual Artist',
      value: 'vartist',
      categories: [ 'graphitti', 'videography', 'photography', 'filming', 'production', 'designing' ]
    },
    {
      title: 'Social Media',
      value: 'social',
      categories: [ 'influencer', 'brand ambassador', 'Stategic media presence', 'casting' ]
    },
    { title: 'Music DJ', value: 'dj', categories: [ 'battles', 'championships', 'dance offs', 'casting' ] },
    { title: 'Ticketing', value: 'ticketing', categories: [ 'Event ticketing' ] }
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header title="Select professions" onBackPress={closeModal} />
      <ScrollView style={{ paddingHorizontal: RFValue(8), flexGrow: 1 }}>
        {pros.map((r, i) => {
          // console.log('Index', professions.findIndex((i) => 1.value));
          const exists = professions.find((x) => x.value === r.value);

          return (
            <Pressable
              key={keyGenerator()}
              onPress={() =>
                !exists
                  ? setProfessions([ ...professions, r ]) // add profession if not existing
                  : setProfessions(professions.filter((x) => x.value !== r.value))} // remove profession if exists
              style={{
                // height: RFValue(50),
                marginBottom: i + 1 === pros.length ? useSafeAreaInsets().bottom + RFValue(10) : RFValue(10),
                // borderWidth: exists ? 0 : 1,
                backgroundColor: exists ? BLACK : '#eeeeee',
                borderColor: HALF_GRAY,
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: RFValue(5),
                padding: RFValue(10),
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flexShrink: 1 }}>
                <Typo
                  text={r.title}
                  size={16}
                  style={{ textTransform: 'capitalize', fontWeight: 'bold', marginBottom: RFValue(10) }}
                  color={exists ? WHITE : BLACK}
                />
                <Typo
                  text={r.categories.join(', ')}
                  size={12}
                  style={{ textTransform: 'capitalize' }}
                  color={exists ? WHITE : GRAY}
                />
              </View>
              {exists ? (
                <DesignIcon name="checkcircle" pkg="ad" color={WHITE} size={22} />
              ) : (
                <DesignIcon name="plus" pkg="mc" color={BLACK} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Professions;
