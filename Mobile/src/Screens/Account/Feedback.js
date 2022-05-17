import React from 'react';
import { View, Text, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Buton, Header, Input, TextArea, Typo } from '../../Components';
import { BLACK, BROWN, GRAY } from '../../Utils/Constants';
import { dateWithoutOffset, showAlert } from '../../Utils/HelperFunctions';
import firestore from '@react-native-firebase/firestore';

export default function Feedback ({ closeModal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((st) => st.Account);
  const loading = useSelector((st) => st.loading.effects.General);
  const [ state, setState ] = React.useState('');

  const onChangeTextHandler = (feedback) => setState(feedback);

  const submitFeedback = () => {
    Keyboard.dismiss();
    dispatch.General.sendFeedback({
      payload: {
        email: user.email,
        feedback: state,
        dateCreated: dateWithoutOffset(),
        timestamp: firestore.FieldValue.serverTimestamp(),
        name: user.name || user.username || '',
        uid: user.uid
      },
      callback: (res) => {
        if (!res.success) return Alert.alert('Something went wrong', res.result);
        closeModal();
        return showAlert(
          'Feedback sent!',
          'Your feedback has been submitted and the team will read it as soon as possible',
          'info'
        );
      }
    });
  };
  return (
    <View style={{ paddingHorizontal: RFValue(8), flex: 1 }}>
      <Header title="Add your feedback" onBackPress={closeModal} extStyles={{ paddingHorizontal: RFValue(0) }} />

      <View style={{ flexGrow: 1 }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, paddingTop: RFValue(0) }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Text style={{ color: BLACK, fontSize: RFValue(14) }}>
            We are constantly making sure we improve your experience in the app and therefore we ask that you leave
            feedback as regards to the following aspects:{'\n\n'} 1. Any bugs/crashing you may encounter while
            navigating the app
            {'\n\n'}
            2. Features that you may want to see included in the app and this means alot to us{'\n\n'}3. Anything that
            made you love the app. {'\n\n'} We will be waiting on your response and see how best we can serve you on
            this platform. Stay tuned for more features coming your way
          </Text>
          <Input
            title="This is your feedback email"
            extStyles={{ marginTop: RFValue(20) }}
            extInputStyles={{ backgroundColor: BROWN, color: GRAY }}
            value={user.email}
            editable={false}
          />

          <TextArea
            title="Your feedback here"
            extInputStyles={{ backgroundColor: BROWN }}
            placeholder="Please enter your desired feedback in this section..."
            value={state}
            onChangeText={onChangeTextHandler}
          />
          <Buton
            title="Submit Feedback"
            onPress={submitFeedback}
            loading={loading.sendFeedback}
            extStyles={{ marginBottom: RFValue(20) }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
