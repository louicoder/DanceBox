import React from 'react';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const EventProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ event, setEvent ] = React.useState({});

  React.useEffect(
    () => {
      getEvent();
    },
    [ route.params ]
  );

  const getEvent = () =>
    dispatch.Events.getEvent({
      eventId: route.params._id,
      callback: (resp) => {
        if (!resp.success)
          return Alert.alert(
            'Error getting event',
            'Something went wrong while trying to fetch this event, please try again'
          );
        setEvent(resp.result);
      }
    });

  const requestPayload = (action) => ({
    action,
    eventId: event._id,
    payload: { uid: user.uid, email: user.email, name: user.name || '', imageUrl: user.imageUrl || '' },
    callback: ({ success, result }) => {
      if (!success) return HelperFunctions.Notify('Error', result);
      getEvent();
    }
  });

  const attendParticipate = (action) => dispatch.Events.attendParticipate(requestPayload(action));

  const unattendUnparticipate = (action) => dispatch.Events.unattendUnparticipate(requestPayload(action));

  const likeHandler = () => {
    const uid = user.uid;
    dispatch.Events.likeEvent({
      eventId: event._id,
      callback: (res) => {
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        setEvent({ ...event, likes: [ ...event.likes, uid ] });
      }
    });
  };

  const postComment = (comment) => {
    // Keyboard.dismiss();
    const { email, name = '', imageUrl = '', uid } = user;
    const owner = { email, name, imageUrl, uid };
    dispatch.Events.createEventComment({
      eventId: event._id,
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
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? RFValue(90) : 0}
      style={{ flex: 1 }}
    >
      <LoadingModal
        isVisible={loading.likeEvent || loading.attendParticipate || loading.getEvent || loading.unattendUnparticipate}
      />
      {event && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <KeyboardAwareFlatList
              style={{ flex: 1, backgroundColor: '#aaaaaa80' }}
              ListHeaderComponent={
                <Header
                  {...event}
                  navigation={navigation}
                  attendParticipate={attendParticipate}
                  unattendUnparticipate={unattendUnparticipate}
                  likeHandler={likeHandler}
                  postComment={(comment) => postComment(comment)}
                />
              }
              data={event.comments}
              key={() => HelperFunctions.keyGenerator()}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => HelperFunctions.keyGenerator()}
              renderItem={({ item, index }) => (
                <SingleComment
                  {...item}
                  navigation={navigation}
                  last={index + 1 === event.comments.length}
                  goto={() => navigation.navigate('NewEventComment', { eventId: event._id })}
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default EventProfile;
