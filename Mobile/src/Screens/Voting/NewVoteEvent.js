import { View, Pressable, Alert } from 'react-native';
import React from 'react';
import { HEIGHT, THEME_COLOR, WHITE } from '../../Utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { Buton, DesignIcon, Header, Input, Typo } from '../../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { keyGenerator, showAlert } from '../../Utils/HelperFunctions';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

const NewVoteEvent = ({ closeModal }) => {
  const [ state, setState ] = React.useState({ options: [], title: '', option: '' });
  const loading = useSelector((st) => st.loading.effects.Events);
  const { user } = useSelector((st) => st.Account);
  const dispatch = useDispatch();

  const stateHandler = (field, value) => setState({ ...state, [field]: value });

  const addOptionHandler = () => {
    if (!state.option) return;
    // if (state.option) {
    setState({
      ...state,
      options: [ ...state.options, { value: state.option && state.option.trim(), id: keyGenerator() } ],
      option: ''
    });
    // return stateHandler('option', '');
    // }
    // return;
  };

  const createVotingEvent = () => {
    const { title, options } = state;
    if (!title || title.length < 5)
      return Alert.alert('Title too short', 'The title for the voting event should be more than 4 characters');
    if (!options.length || options.length < 2)
      return Alert.alert('Insufficient options', 'You need atleast two options in order to create a voting event');
    const payload = {
      title,
      options,
      authorId: user.uid,
      email: user.email,
      dateCreated: new Date().toISOString(),
      timestamp: firestore.FieldValue.serverTimestamp()
    };

    dispatch.Events.createVotingEvent({
      payload,
      callback: (res) => {
        if (!res.success) return Alert.alert('Something went wrong', res.result);
        closeModal();
      }
    });
  };

  // console.log('OPTINONS====', state.options);

  return (
    <View style={{ height: HEIGHT, width: '100%', paddingHorizontal: RFValue(0) }}>
      <Header
        title="Add Voting details"
        onBackPress={closeModal}
        extStyles={{ backgroundColor: THEME_COLOR }}
        iconProps={{ color: WHITE }}
        titleStyles={{ color: WHITE }}
      />
      <View style={{ flexGrow: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: RFValue(8) }} keyboardShouldPersistTaps="always">
          <View
            style={{
              backgroundColor: '#D0ECFE',
              marginVertical: RFValue(30),
              padding: RFValue(10),
              borderRadius: RFValue(10)
            }}
          >
            <Typo text="⚠️ Note: 24 hour limit!" size={16} style={{ fontWeight: 'bold' }} />
            <Typo text="Voting events are only valid for 24 hours after time of creation. Therefore make sure your votes are collected before 24 hours elapse from time of creation." />
          </View>

          <Input
            title="Voting Title"
            extInputStyles={{ backgroundColor: '#eee', height: RFValue(35) }}
            placeholder="Enter the title of this voting event"
            value={state.title}
            onChangeText={(e) => stateHandler('title', e)}
          />
          <Typo
            text="Add voting options (Atleast two options and more)"
            size={12}
            style={{ marginBottom: RFValue(5) }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ height: RFValue(35), width: '78%' }}>
              <Input
                // title="Voting Title"
                extInputStyles={{ backgroundColor: '#eee', height: RFValue(35), marginTop: 0 }}
                placeholder="Enter option to add to voting event"
                onChangeText={(e) => stateHandler('option', e)}
                onSubmitEditing={addOptionHandler}
                value={state.option}
              />
            </View>
            <Pressable
              onPress={addOptionHandler}
              style={{
                width: '20%',
                backgroundColor: '#000',
                height: RFValue(35),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typo text="Add" size={16} style={{}} color={WHITE} />
            </Pressable>
          </View>

          <View style={{ marginTop: RFValue(20) }}>
            <Typo text="All voting options are below" style={{ marginBottom: RFValue(5) }} size={12} />
            {state.options && state.options.length ? (
              state.options.map((r) => (
                <View
                  key={r.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: RFValue(10),
                    // borderWidth: 1,
                    paddingVertical: RFValue(10),
                    paddingHorizontal: RFValue(10),
                    // borderColor: '#2F3CDB',
                    backgroundColor: '#D0ECFE',
                    borderRadius: RFValue(8)
                  }}
                >
                  <Typo text={r.value} style={{ flexShrink: 1, marginRight: RFValue(15) }} size={16} />
                  <DesignIcon
                    onPress={() => stateHandler('options', state.options.filter((x) => x.id !== r.id))}
                    withBorder
                    name="close"
                    pkg="ad"
                    widthHeight={30}
                    backColor="#2F3CDB90"
                    size={20}
                    color={WHITE}
                  />
                </View>
              ))
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 0.3 * HEIGHT,
                  // backgroundColor: '#B5CA78',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typo text="Add some options to get started" size={12} color="#ccc" />
              </View>
            )}
          </View>
          <Buton
            title="Create Voting Event"
            extStyles={{ backgroundColor: THEME_COLOR }}
            onPress={createVotingEvent}
            loading={loading.createVotingEvent}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default NewVoteEvent;
