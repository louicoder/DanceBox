import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ProgressBarAndroid
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ComingSoon from '../../../Components/ComingSoon';
import CommentsLikeButtons from '../../../Components/CommentsLikeButtons';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconWithText } from '../../../Components';
import { THEME_COLOR2, THEME_COLOR3, THEME_COLOR4, THEME_COLOR5 } from '../../../Utils/Constants';

const Header = ({
  likeHandler,
  imageUrl,
  title,
  description,
  likes,
  comments,
  _id,
  venue,
  participating,
  judgingCriteria,
  attending,
  dateCreated,
  noOfJudges,
  free,
  tags,
  price,
  judgingNotes,
  startDate,
  endDate,
  attendParticipate,
  unattendUnparticipate,
  navigation,
  eventId,
  postComment,
  showCommentBox,
  ...rest
}) => {
  // const { user } = useSelector((state) => state.Account);
  const stato = useSelector((state) => state);
  const [ visible, setVisible ] = React.useState(false);
  const [ user, setUser ] = React.useState({ _id: '' });
  const [ comment, setComment ] = React.useState('posting something else here');

  React.useEffect(
    () => {
      // const sub =
      const sub = navigation.addListener('focus', async () => {
        await HelperFunctions.getUser(({ success, result }) => success && setUser(result));
      });

      return () => sub;
    },
    [ navigation ]
  );

  const isParticipant = () => {
    // const part = events.find((event) => event._id === _id);
    return user && participating && participating.findIndex((el) => el._id === user._id) !== -1;
  };

  const isAttending = () => {
    // const attend = events.find((event) => event._id === _id);
    return user && attending && attending.findIndex((el) => el._id === user._id) !== -1;
  };

  return (
    <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: RFValue(15) }}>
      <Image
        source={{ uri: imageUrl || CONSTANTS.EVENTS_PIC }}
        resizeMode="cover"
        style={{ width: '100%', height: RFValue(300) }}
      />

      <View style={{ paddingHorizontal: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(25), marginVertical: RFValue(15), fontWeight: 'bold' }}>{title}</Text>

        <IconWithText
          name="trending-up"
          pkg="ft"
          text={`${(attending && attending.length) || 0} going ・ ${(participating && participating.length) ||
            0} participants`}
        />
        <IconWithText
          name="calendar"
          pkg="mc"
          text={`${moment(startDate).format('DD-MMM-YYYY')} to ${moment(endDate).format('DD-MMM-YYYY')}`}
          // text="20-September-2021 to 20-September-2021"
        />
        <IconWithText name="map-marker" pkg="mc" text={venue} />
        <IconWithText name="tago" pkg="ad" text={tags && tags.join(', ')} />
        <IconWithText
          name="clockcircleo"
          pkg="ad"
          size={RFValue(22)}
          text={`Created ・ ${moment(dateCreated).fromNow()}`}
        />

        <Text style={{ fontSize: RFValue(16), marginVertical: RFValue(10), fontWeight: 'bold' }}>
          About this event:
        </Text>
        {/* <Text style={{ fontSize: RFValue(16) }}>{description}</Text> */}

        <IconWithText name="idcard" pkg="ad" text={description} />

        <CommentsLikeButtons
          likeHandler={likeHandler}
          likes={likes}
          comments={comments}
          type="event"
          id={_id}
          extStyles={{ paddingHorizontal: 0 }}
        />
        {/* End tags */}

        {/* Go to voting page */}
        {/* <Pressable
          onPress={() => navigation.navigate('Voting', { user, eventId: _id })}
          style={{
            width: '100%',
            // backgroundColor: '#eee',
            backgroundColor: THEME_COLOR3,
            height: RFValue(50),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(16) }}>Go to Voting</Text>
        </Pressable> */}

        {/* Attend and participate buttons */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: RFValue(10) }}>
          <Pressable
            onPress={() => (isAttending() ? unattendUnparticipate('unattend') : attendParticipate('attend'))}
            style={{
              height: RFValue(50),
              width: '49%',
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',

              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: RFValue(16), color: '#fff', textAlign: 'center', marginLeft: RFValue(5) }}>
              {isAttending() ? 'Cancel Attendance' : '+ Attend'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              isParticipant() ? unattendUnparticipate('unparticipate') : attendParticipate('participate')}
            style={{
              height: RFValue(50),
              width: '49%',
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Text style={{ fontSize: RFValue(16), color: '#fff', textAlign: 'center', marginLeft: RFValue(5) }}>
              {isParticipant() ? 'Cancel Participation' : '+ Participate'}
            </Text>
          </Pressable>
        </View> */}

        <View
          style={{
            width: '100%',
            // borderWidth: 1,
            marginVertical: RFValue(10),
            borderColor: !visible ? 'transparent' : '#ddd'
          }}
        >
          <Pressable
            onPress={() => setVisible(!visible)}
            style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
              // backgroundColor: THEME_COLOR5,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: RFValue(10)
            }}
          >
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>
              {visible ? 'Close' : 'Tap to view'} judging criteria:
            </Text>
            <Icon name={!visible ? 'chevron-down' : 'chevron-up'} size={RFValue(25)} color="#000" />
          </Pressable>
          {visible ? (
            <View style={{ padding: RFValue(10), borderWidth: 1, borderColor: '#eee', borderTopWidth: 0 }}>
              <Text style={{ fontSize: RFValue(16) }}>{judgingNotes}</Text>
              <Text style={{ fontSize: RFValue(16), marginVertical: RFValue(10), color: '#000', fontWeight: 'bold' }}>
                Number of judges ・ {noOfJudges} Judges
              </Text>
              <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>
                Event judged by ・ {judgingCriteria === 'both' ? 'Judges + Audience' : judgingCriteria}
              </Text>
            </View>
          ) : null}
        </View>

        {user && user._id ? (
          <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(15) }}>Join the conversation below</Text>
        ) : null}
        {user && user._id ? (
          <View
            style={{ flexDirection: 'row', marginBottom: RFValue(15), width: '100%', justifyContent: 'space-between' }}
          >
            <View style={{ width: '10%' }}>
              <Image
                source={{ uri: (user && user.imageUrl) || CONSTANTS.DEFAULT_PROFILE }}
                style={{
                  marginRight: RFValue(20),
                  width: RFValue(30),
                  height: RFValue(30),
                  borderRadius: RFValue(30),
                  marginTop: RFValue(5)
                }}
              />
            </View>

            <Pressable
              onPress={showCommentBox}
              style={{
                flexGrow: 1,
                backgroundColor: '#eee',
                // backgroundColor: THEME_COLOR5,
                marginLeft: RFValue(10),
                height: RFValue(40),
                justifyContent: 'center',
                paddingHorizontal: RFValue(10)
              }}
            >
              <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>Enter your comment...</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
