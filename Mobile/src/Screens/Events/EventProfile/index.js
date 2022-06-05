import React from 'react';
import { View, StatusBar, Keyboard, ScrollView, TextInput, ActivityIndicator } from 'react-native';
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
import { Buton, ComingSoon, Comments, DesignIcon, EventPreview, Input, TextArea, Typo } from '../../../Components';
import CommentBox from './CommentBox';
import {
  BROWN,
  GRAY,
  HALF_BROWN,
  HALF_GRAY,
  THEME_COLOR,
  THEME_COLOR6,
  THEME_COLOR7,
  WHITE,
  WIDTH
} from '../../../Utils/Constants';
import { useKeyboard } from '../../../Utils/useKeyboardHeight';
import { showAlert } from '../../../Utils/HelperFunctions';
// import KeyboardStickyView from '../../Components/StickyView';

const EventProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  // const stato = useSelector((state) => state);
  const loading = useSelector((state) => state.loading.effects);
  const { activeEvent } = useSelector((state) => state.Events);
  const [ event, setEvent ] = React.useState({});
  const [ state, setState ] = React.useState({ commentShowing: false, comments: [] });
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);
  // const [ hyt ] = useKeyboard();
  const [ comment, setComment ] = React.useState('');

  React.useEffect(
    () => {
      // console.log('EVENT PROFILE', route.params);
      if (route.params && route.params._id) getEvent();
    },
    [ route.params, navigation ]
  );

  React.useEffect(
    () => {
      // console.log('EVENT PROFILE', route.params);
      const sub = navigation.addListener('focus', () => {
        getPostComments();
      });

      return () => {
        navigation.removeListener(sub);
      };
    },
    [ navigation ]
  );

  React.useEffect(() => {
    // StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(THEME_COLOR);
    // StatusBar.setTranslucent(true);
    // HelperFunctions.getUser(({ result, success }) => success && setUser(result));
  }, []);

  // console.log('----USER---', user);

  const getEvent = () =>
    dispatch.Events.getEvent({
      eventId: route.params._id,
      callback: ({ success, result }) => {
        if (!success)
          return showAlert(
            'Error getting event',
            'Something went wrong while trying to fetch this event details, please try again'
          );
        // setEvent(result);
        // return getPostComments();
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

  const postComment = () => {
    Keyboard.dismiss();
    // console.log('Raeched posting comment', comment);
    if (!comment) return showAlert('Empty comment', 'Please add a comment in order to continue commenting.', 'danger');
    const payload = { comment, authorId: user.uid, postId: route.params._id };
    dispatch.General.postComment({
      // eventId: user,
      payload,
      callback: ({ result, success }) => {
        if (!success) return showAlert('Failed!', result);
        setComment('');
        // let comments = [ ...state.comments ];
        // comments.unshift(result);
        // setState({ ...state, comments, commentShowing: false });
      }
    });
  };

  const getPostComments = () => {
    dispatch.General.setField('comments', []);
    dispatch.General.setField('commentsPagination', {
      nextPage: 1,
      limit: 10,
      totalDocuments: 0,
      last: false,
      totalPages: 1
    });

    dispatch.General.getPostComments({
      postId: route.params._id,
      callback: ({ result, success }) => {
        // console.log('Comments', result);
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        // setState({ ...state, comments: result });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{ position: 'absolute', bottom: hyt, width: '100%', zIndex: 40, height: RFValue(100) }}>
        <TextArea
          placeholder="Leave your comment..."
          extStyles={{ marginBottom: 0, backgroundColor: GRAY, height: RFValue(100) }}
          extInputStyles={{ backgroundColor: HALF_GRAY, marginBottom: 0, marginTop: 0 }}
        />
      </View> */}
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent', paddingHorizontal: RFValue(0) }}>
        <EventPreview
          // onPress={() => null}
          // borderRadius={false}
          extStyles={{ marginBottom: 0, height: 3 / 4 * WIDTH, borderRadius: 0 }}
          event={activeEvent}
          {...activeEvent}
          borderRadius={false}
          onPress={false}
        />
        <View style={{ paddingHorizontal: RFValue(8) }}>
          <Typo
            text={`${activeEvent &&
              activeEvent.followers &&
              activeEvent &&
              activeEvent.followers.length} follower${activeEvent &&
            activeEvent.followers &&
            activeEvent.followers.length > 1
              ? 's'
              : ''}`}
            style={{
              backgroundColor: '#eee',
              paddingVertical: RFValue(5),
              alignSelf: 'flex-start',
              marginVertical: RFValue(15),
              borderRadius: RFValue(30),
              paddingHorizontal: RFValue(10)
            }}
          />
          <Typo text="Details" size={18} style={{ fontWeight: 'bold', marginVertical: RFValue(8) }} />

          <Typo text={activeEvent && activeEvent.description} />

          {/* <Typo
            text="Follow the conversation"
            size={18}
            style={{ fontWeight: 'bold', marginTop: RFValue(15), marginBottom: RFValue(10) }}
          /> */}
        </View>

        {/* {[ ...new Array(3).fill() ].map((r) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: RFValue(25),
              paddingHorizontal: RFValue(8)
            }}
          >
            <View
              style={{
                width: 0.1 * WIDTH,
                height: 0.1 * WIDTH,
                borderRadius: RFValue(50),
                backgroundColor: BROWN,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <DesignIcon name="user" pkg="ad" />
            </View>

            <View style={{ flexShrink: 1, marginLeft: RFValue(15) }}>
              <Typo
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quo plebiscito decreta a senatu est consuli quaestio Cn. Theophrasti igitur, inquit, tibi liber ille placet de beata vita? Dicet pro me ipsa virtus nec dubitabit isti vestro beato M. Summum ením bonum exposuit vacuitatem doloris;"
                size={13}
              />
            </View>
          </View>
        ))}
        <Buton title="View All Comments" extStyles={{ marginHorizontal: RFValue(8), height: RFValue(40) }} /> */}
        <Comments postId={route.params && route.params._id} navigation={navigation} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#ddd',
          paddingHorizontal: RFValue(10)
        }}
      >
        <TextInput
          placeholder="Enter your comment here..."
          multiline
          style={{ maxHeight: RFValue(100), width: '75%', marginRight: RFValue(10), fontSize: RFValue(14) }}
          value={comment}
          onChangeText={(e) => setComment(e)}
        />
        {loading.General.postComment || loading.General.getPostComments ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Typo
            text="Post"
            onPress={postComment}
            style={{
              backgroundColor: THEME_COLOR,
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(5),
              borderRadius: RFValue(50)
            }}
            pressable
            color={WHITE}
          />
        )}
      </View>
    </View>
  );
};

export default EventProfile;
