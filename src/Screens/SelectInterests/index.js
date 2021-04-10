import React from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS } from '../../Utils';

const Interests = ({ navigation }) => {
  const [ state, setState ] = React.useState({ interests: [] });

  const setInterstsHandler = (interest) => {
    // sdsd
    const found = state.interests.indexOf(interest);
    if (found === -1) return setState({ ...state, interests: [ ...state.interests, interest ] });
    else {
    }
    return setState({ ...state, interests: [ ...state.interests.filter((intr) => intr !== interest) ] });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>This is the interest page</Text> */}
      <Text style={{ marginBottom: RFValue(50), fontSize: RFValue(20), fontWeight: '700' }}>Pick your interests</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {// [
        // 'Bboy',
        // 'contemporary',
        // 'Latin',
        // 'Popping',
        // 'Cultural',
        // 'Choreography',
        // 'Tap dance',
        // 'Blogs'
        // ]
        CONSTANTS.INTERESTS.map((item) => (
          <Pressable
            style={{
              padding: RFValue(15),
              borderWidth: RFValue(0.5),
              marginBottom: RFValue(10),
              marginHorizontal: RFValue(5),
              borderRadius: RFValue(50),
              borderColor: '#000',
              backgroundColor: state.interests.includes(item) ? '#000' : 'transparent'
            }}
            onPress={() => setInterstsHandler(item)}
          >
            <Text
              style={{
                fontSize: RFValue(14),
                textTransform: 'capitalize',
                color: state.interests.includes(item) ? '#fff' : '#000'
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={{
          position: 'absolute',
          bottom: RFValue(40),
          backgroundColor: '#000',
          paddingVertical: RFValue(15),
          paddingHorizontal: RFValue(50),
          borderRadius: RFValue(5)
        }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{ fontSize: RFValue(16), color: '#fff', fontWeight: '600' }}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Interests;
