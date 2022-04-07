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
import { Buton, ComingSoon, DesignIcon, EventPreview, Input, TextArea, Typo } from '../../../Components';
import CommentBox from './CommentBox';
import { BROWN, GRAY, HALF_BROWN, HALF_GRAY, WIDTH } from '../../../Utils/Constants';
import { useKeyboard } from '../../../Utils/useKeyboardHeight';
// import KeyboardStickyView from '../../Components/StickyView';

const EventProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  // const stato = useSelector((state) => state);
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ event, setEvent ] = React.useState({});
  const [ state, setState ] = React.useState({ commentShowing: false, comments: [] });
  const [ isKeyboardVisible, setKeyboardVisible ] = React.useState(false);
  const [ hyt ] = useKeyboard();
  // const [ user, setUser ] = React.useState(false);

  React.useEffect(() => {
    // getEvent();
  }, []);

  React.useEffect(() => {
    // HelperFunctions.getUser(({ result, success }) => success && setUser(result));
  }, []);

  console.log('----USER---', user);

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
          onPress={() => null}
          borderRadius={false}
          extStyles={{ marginBottom: 0, height: 3 / 4 * WIDTH }}
        />
        <View style={{ paddingHorizontal: RFValue(8) }}>
          <Typo text="Details" size={18} style={{ fontWeight: 'bold', marginVertical: RFValue(8) }} />

          <Typo text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui ita affectus, beatum esse numquam probabis; Licet hic rursus ea commemores, quae optimis verbis ab Epicuro de laude amicitiae dicta sunt. Quia, si mala sunt, is, qui erit in iis, beatus non erit. Illum mallem levares, quo optimum atque humanissimum virum, Cn. Duo Reges: constructio interrete. Restant Stoici, qui cum a Peripateticis et Academicis omnia transtulissent, nominibus aliis easdem res secuti sunt. Nonne igitur tibi videntur, inquit, mala? Quis Aristidem non mortuum diligit?" />

          <Typo
            text="Follow the conversation"
            size={18}
            style={{ fontWeight: 'bold', marginTop: RFValue(15), marginBottom: RFValue(10) }}
          />
        </View>

        {[ ...new Array(3).fill() ].map((r) => (
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
        <Buton title="View All Comments" extStyles={{ marginHorizontal: RFValue(8), height: RFValue(40) }} />
      </ScrollView>
    </View>
  );
};

export default EventProfile;
