import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { CONSTANTS } from '../../Utils';
import { QUERIES } from '../../Firebase';
import { Buton, Typo } from '../../Components';
import { AUTH, BLACK, BROWN, WHITE, WIDTH } from '../../Utils/Constants';
import { keyGenerator } from '../../Utils/HelperFunctions';
import BackGround from '../../assets/Back.svg';

const Interests = ({ navigation }) => {
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Account);
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

  // console.log('AUTH', AUTH.currentUser);

  const postIntersts = () => {
    const { interests } = state;
    dispatch.Account.updateAccountDetails({
      uid: AUTH.currentUser.uid,
      payload: { interests },
      callback: (resp) => navigation.navigate('AddProfilePhoto')
    });
  };

  return (
    <React.Fragment>
      <LoadingModal isVisible={state.loading} />
      {/* <BackGround /> */}
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: RFValue(50), fontSize: RFValue(20), fontWeight: '700' }}>Pick your interests</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CONSTANTS.INTERESTS.map((item) => (
            <Pressable
              key={keyGenerator()}
              style={{
                paddingHorizontal: RFValue(10),
                paddingVertical: RFValue(8),
                // borderWidth: RFValue(0.5),
                marginBottom: RFValue(10),
                marginHorizontal: RFValue(5),
                borderRadius: RFValue(50),
                borderColor: '#000',
                backgroundColor: state.interests.includes(item) ? BLACK : BROWN
              }}
              onPress={() => setInterstsHandler(item)}
            >
              <Typo
                size={12}
                text={item}
                pressable
                // pressable
                onPress={() => setInterstsHandler(item)}
                // onPress={() => null}
                style={{
                  // fontSize: RFValue(14),
                  textTransform: 'capitalize',
                  color: state.interests.includes(item) ? '#fff' : '#000'
                }}
              />
            </Pressable>
          ))}
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: RFValue(40) }}
        >
          <Buton
            title="Skip"
            onPress={() => navigation.navigate('AddProfilePhoto')}
            textStyles={{ color: BLACK }}
            extStyles={{
              width: 0.35 * WIDTH,
              backgroundColor: 'transparent',
              borderWidth: 1,
              height: RFValue(35),
              borderColor: BLACK
            }}
            loading={loading.updateAccountDetails}
            showLoader={false}
          />

          <Buton
            title="Continue"
            onPress={() => (state.interests && state.interests.length ? postIntersts() : null)}
            textStyles={{ color: WHITE }}
            extStyles={{
              width: 0.35 * WIDTH,
              backgroundColor: BLACK,
              borderWidth: 1,
              marginLeft: RFValue(10),
              height: RFValue(35),
              borderColor: BLACK
            }}
            loading={loading.updateAccountDetails}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Interests;
