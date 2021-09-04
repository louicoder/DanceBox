import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { CONSTANTS } from '../../Utils';
import { QUERIES } from '../../Firebase';

const Interests = ({ navigation }) => {
  const { user } = useSelector((state) => state.Account);
  const [ state, setState ] = React.useState({ interests: [], loading: false });
  const dispatch = useDispatch();

  const setInterstsHandler = (interest) => {
    // sdsd
    const found = state.interests.indexOf(interest);
    if (found === -1) return setState({ ...state, interests: [ ...state.interests, interest ] });
    else {
    }
    return setState({ ...state, interests: [ ...state.interests.filter((intr) => intr !== interest) ] });
  };

  const postIntersts = async () => {
    // setState({ ...state, loading: true });
    // const { interests } = state;
    // await QUERIES.updateDoc('Users', docId, { interests }, (res) => {
    //   if (res.error) return Alert.alert('Error updating interests', res.error);
    //   return navigation.navigate('Home');
    // });
    // await firestore()
    //   .collection('Users')
    //   .doc(user.uid)
    //   .set({ interests }, { merge: true })
    //   .then(() => navigation.navigate('Home'))
    //   .catch((error) => {
    //     setState({ ...state, loading: false });
    //     alert(
    //       `Something went wrong while adding your requests, please try again, if the problem persists you can try at a later stage`
    //     );
    //   });
  };

  return (
    <React.Fragment>
      <LoadingModal isVisible={state.loading} />

      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: RFValue(50), fontSize: RFValue(20), fontWeight: '700' }}>Pick your interests</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CONSTANTS.INTERESTS.map((item) => (
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
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: RFValue(40) }}
        >
          <Pressable
            style={{
              backgroundColor: state.interests && state.interests.length ? '#000' : '#eee',
              paddingVertical: RFValue(15),
              paddingHorizontal: RFValue(20),
              borderRadius: RFValue(5),
              marginHorizontal: RFValue(3)
            }}
            onPress={() => (state.interests && state.interests.length ? postIntersts() : null)}
          >
            <Text
              style={{
                fontSize: RFValue(16),
                color: state.interests && state.interests.length ? '#fff' : '#aaa',
                fontWeight: 'bold'
              }}
            >
              Continue
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderColor: '#000',
              borderWidth: 1,
              paddingVertical: RFValue(15),
              paddingHorizontal: RFValue(20),
              borderRadius: RFValue(5),
              marginHorizontal: RFValue(3)
            }}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{ fontSize: RFValue(16), color: '#000', fontWeight: 'normal' }}>Skip for now</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Interests;
