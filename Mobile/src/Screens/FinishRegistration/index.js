import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../../Components/Header';
import { Input, TextArea, Buton, Select, BottomSheet, Typo } from '../../Components';
import { AUTH, BLACK, BROWN, GRAY, HALF_BLACK, HEIGHT } from '../../Utils/Constants';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAlert } from '../../Utils/HelperFunctions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Professions from './Professions';

const FinishRegisration = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);
  const [ visible, setVisible ] = React.useState(false);
  const [ state, setState ] = React.useState({
    name: 'Sample name',
    username: 'Kodak',
    phoneNumber: '+256783140303',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At negat Epicurus-hoc enim vestrum lumen estquemquam, qui honeste non vivat, iucunde posse vivere. Scio enim esse quosdam, qui quavis lingua philosophari possint; Causa autem fuit huc veniendi \n\n\n ut quosdam hinc libros promerem. Quodsi vultum tibi, si incessum fingeres, quo gravior viderere, non esses tui similis; Duo Reges: constructio interrete. Sic vester sapiens magno aliquo emolumento commotus cicuta, si opus erit, dimicabit.',
    address: 'Kampala-Buagnda rd plot 123',
    professions: []
  });

  React.useEffect(() => navigation.setParams({ goToAddPhoto: () => navigation.navigate('Interests') }), []);

  const updateAccount = () => {
    const payload = state;
    dispatch.Account.updateAccountDetails({
      uid: AUTH.currentUser.uid,
      payload,
      callback: (resp) =>
        resp.success ? navigation.navigate('Interests') : showAlert('Something went wrong', resp.result)
    });
  };

  const openModal = React.useCallback(() => setVisible(true), [ visible ]);

  const closeModal = React.useCallback(() => setVisible(false), [ visible ]);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={visible} closeModal={closeModal}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#fff'
            // paddingTop: RFValue(20),
            // paddingHorizontal: RFValue(0)
            // paddingBottom: useSafeAreaInsets().bottom
          }}
        >
          <Professions
            {...state}
            setProfessions={(professions) => setState({ ...state, professions })}
            closeModal={closeModal}
          />
        </View>
      </BottomSheet>
      <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RFValue(8) }} showsVerticalScrollIndicator={false}>
        <Input
          title="full name / event name / company name / group name"
          placeholder="Enter your full name/ company name/event name etc..."
          extInputStyles={{ backgroundColor: '#eee', height: RFValue(40), borderWidth: 0 }}
          value={state.name}
          onChangeText={(name) => setState({ ...state, name })}
          extStyles={{ marginTop: RFValue(20) }}
        />
        <Select
          title="what's are your professions"
          onPress={openModal}
          extStyles={{}}
          option={`${[ ...state.professions.map((r) => r.title) ].join(', ').slice(0, 40)}${[
            ...state.professions.map((r) => r.title)
          ].join(', ').length > 40
            ? '...'
            : ''}`}
        />
        <Input
          title="Username / Alias"
          placeholder="Your username will appear as @username"
          extInputStyles={{ backgroundColor: '#eee', height: RFValue(40), borderWidth: 0 }}
          value={state.username}
          onChangeText={(username) => setState({ ...state, username })}
        />
        <Input
          title="Physical Address / Location"
          placeholder="Your address e.g Kampala-Uganda, Bweyogerere"
          extInputStyles={{ backgroundColor: '#eee', height: RFValue(40), borderWidth: 0 }}
          value={state.address}
          onChangeText={(address) => setState({ ...state, address })}
        />
        <Input
          title="Phone number"
          placeholder="Your phone number e.g +256784562341"
          extInputStyles={{ backgroundColor: '#eee', height: RFValue(40), borderWidth: 0 }}
          value={state.phoneNumber}
          onChangeText={(phoneNumber) => setState({ ...state, phoneNumber })}
        />

        <TextArea
          extInputStyles={{ backgroundColor: BROWN, borderWidth: 0 }}
          title="Tell us about yourself"
          placeholder={`Enter a brief description about you so people can get to know you better`}
          placeHolderTextColor={HALF_BLACK}
          value={state.about}
          onChangeText={(about) => setState({ ...state, about })}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'column-reverse',
            justifyContent: 'space-between'
          }}
        >
          {/* <Buton
            title="Skip this step"
            onPress={() => null}
            extStyles={{ backgroundColor: 'transparent', borderWidth: 1, width: '100%', marginTop: 10 }}
            textStyles={{ color: BLACK }}
            loading={loading.updateAccountDetails}
            onPress={() => (!loading.updateAccountDetails ? navigation.navigate('Interests') : null)}
          /> */}
          <Buton
            title="Update my account"
            // onPress={() => null}
            extStyles={{
              backgroundColor: BLACK,
              borderWidth: 1,
              width: '100%',
              marginBottom: useSafeAreaInsets().bottom + RFValue(20)
            }}
            loading={loading.updateAccountDetails}
            onPress={() => (!loading.updateAccountDetails ? updateAccount() : null)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FinishRegisration;
