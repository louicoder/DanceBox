import React from 'react';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleEvent';
import CommentsLikeButtons from '../../../Components/CommentsLikeButtons';
import LoadingModal from '../../../Components/LoadingModal';
import SingleComment from '../../../Components/SingleComment';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const EventProfile = ({ navigation, route, ...props }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ state, setState ] = React.useState({ ...route.params });

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        setState({ ...route.params });
      });
      return () => sub;
    },
    [ navigation, route.params ]
  );

  const payload = { owner: { uid: user.uid, email: user.email, name: user.name || '', imageUrl: user.imageUrl || '' } };

  const participate = () => {
    //
    dispatch.Events.participateInEvent({
      eventId: state._id,
      payload,
      callback: (resp) => {
        if (!resp.success) return HelperFunctions.Notify('Error', resp.result);
        return HelperFunctions.Notify('Success', 'Successfully sent request to event organiser');
      }
    });
  };

  const attend = () => {
    //
    dispatch.Events.attendEvent({
      eventId: state._id,
      payload,
      callback: (resp) => {
        // console.log('REsp from particpating', resp);
        if (!resp.success) return HelperFunctions.Notify('Error', resp.result);
        return HelperFunctions.Notify('Success', 'Successfully added you to the waiting list');
      }
    });
  };

  // console.log('Header id', state);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? RFValue(90) : 0}
      style={{ flex: 1 }}
    >
      <LoadingModal isVisible={loading.likeEvent} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1, backgroundColor: '#aaaaaa80' }}
            ListHeaderComponent={
              <Header {...state} participate={participate} attend={attend} navigation={navigation} />
            }
            data={state.comments}
            key={() => HelperFunctions.keyGenerator()}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => HelperFunctions.keyGenerator()}
            renderItem={({ item, index }) => (
              <SingleComment
                {...item}
                navigation={navigation}
                last={index + 1 === state.comments.length}
                goto={() => navigation.navigate('NewEventComment', { eventId: state._id })}
              />
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EventProfile;
