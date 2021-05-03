import React from 'react';
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';

const { height } = Dimensions.get('window');

const NewBlogComment = ({ navigation, route: { params: { eventId } } }) => {
  const [ comment, setComment ] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ei reliquisti, nisi te, quoquo modo loqueretur, intellegere, quid diceret? Non minor, inquit, voluptas percipitur ex vilissimis rebus quam ex pretiosissimis '
  );
  const { user } = useSelector((state) => state.Account);
  const { events } = useSelector((state) => state.Events);
  const loading = useSelector((state) => state.loading.effects.Events);
  const dispatch = useDispatch();

  // console.log('EVent id', eventId);

  // posting comment
  const postComment = () => {
    Keyboard.dismiss();
    const { email, name = '', imageUrl = '', uid } = user;
    const owner = { email, name, imageUrl, uid };
    dispatch.Events.createEventComment({
      eventId,
      payload: { comment, owner },
      callback: (res) => {
        // console.log('Rvent when going back==', res);
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        const event = events.find((event) => event._id === eventId);
        return navigation.navigate('EventProfile', { ...event, comments: [ ...event.comments, { comment, owner } ] });
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal isVisible={loading.createEventComment} />
      <KeyboardAwareScrollView style={{ flex: 1, padding: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(14) }}>Add your comment below</Text>
        <TextInput
          textAlignVertical="top"
          placeholder="Enter your comment here..."
          placeholderTextColor="#aaa"
          value={comment}
          scrollEnabled={false}
          multiline
          style={{
            backgroundColor: '#eee',
            // flexGrow: 1,
            marginVertical: RFValue(20),
            padding: RFValue(10),
            height: RFValue(2 / 3 * height)
          }}
          onChangeText={(comment) => setComment(comment)}
        />

        <Pressable
          onPress={postComment}
          style={{ height: RFValue(40), backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: RFValue(14) }}>Create comment</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewBlogComment;
