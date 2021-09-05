import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
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
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ComingSoon, DesignIcon } from '../../../Components';
import CommentBox from './CommentBox';
// import KeyboardStickyView from '../../Components/StickyView';

const EventProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.Account);
  // const stato = useSelector((state) => state);
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ event, setEvent ] = React.useState({});
  const [ state, setState ] = React.useState({ commentShowing: false, comments: [] });
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);
  const [ user, setUser ] = React.useState(false);

  React.useEffect(
    () => {
      getEvent();
    },
    [ route.params ]
  );

  React.useEffect(() => {
    HelperFunctions.getUser(({ result, success }) => success && setUser(result));
  }, []);

  // console.log('----USER---', user);

  const getEvent = () =>
    dispatch.Events.getEvent({
      eventId: route.params._id,
      callback: ({ success, result }) => {
        if (!success)
          return Alert.alert(
            'Error getting event',
            'Something went wrong while trying to fetch this event, please try again'
          );
        setEvent(result);
        return getComments();
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
    Keyboard.dismiss();
    dispatch.Events.createEventComment({
      eventId: user,
      payload: { comment, authorId: user._id, type: 'event', id: route.params._id },
      callback: ({ result, success }) => {
        if (!success) return HelperFunctions.Notify('Error', result);
        let comments = [ ...state.comments ];
        comments.unshift(result);
        setState({ ...state, comments, commentShowing: false });
      }
    });
  };

  const getComments = () =>
    dispatch.Events.getEventComments({
      eventId: route.params._id,
      callback: ({ result, success }) => {
        // console.log('Comments', result);
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        setState({ ...state, comments: result });
      }
    });

  // console.log('PARMAS. comments', route.params);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {state.commentShowing && (
        <CommentBox close={() => setState({ ...state, commentShowing: false })} postComment={postComment} user={user} />
      )}
      <ScrollView
        style={{ flex: 1, backgroundColor: '#eeeeee70' }}
        // extraScrollHeight={useSafeAreaInsets().top}
      >
        <Header
          {...event}
          comments={state.comments}
          navigation={navigation}
          attendParticipate={attendParticipate}
          unattendUnparticipate={unattendUnparticipate}
          likeHandler={likeHandler}
          postComment={(comment) => postComment(comment)}
          showCommentBox={() => setState({ ...state, commentShowing: true })}
        />

        <View
          style={{
            paddingVertical: RFValue(state.comments && user && user._id ? 20 : 0),
            flexGrow: 1,
            backgroundColor: '#fff'
          }}
        >
          {state.comments.map((item, index) => (
            <SingleComment
              key={item._id}
              first={index === 0}
              {...item}
              navigation={navigation}
              last={state.comments && index + 1 === state.comments.length}
              // goto={() => navigation.navigate('NewEventComment', { eventId: event._id })}
            />
          ))}

          {user && state.comments && !state.comments.length ? (
            <ComingSoon title="">
              <Pressable
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() => setState({ ...state, commentShowing: true })}
              >
                <DesignIcon name="chatbubble-ellipses-outline" pkg="io" size={RFValue(100)} color="#ccc" />
                <Text style={{ textAlign: 'center', color: '#ccc', fontSize: RFValue(16) }}>
                  No comments yet, touch here to be the first one to add a comment...
                </Text>
              </Pressable>
            </ComingSoon>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventProfile;
