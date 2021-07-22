import moment from 'moment';
import React from 'react';
import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ComingSoon from '../../../Components/ComingSoon';
import CommentsLikeButtons from '../../../Components/CommentsLikeButtons';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  ...rest
}) => {
  // const { user } = useSelector((state) => state.Account);
  const stato = useSelector((state) => state);
  const [ visible, setVisible ] = React.useState(false);
  const [ user, setUser ] = React.useState(false);
  const [ comment, setComment ] = React.useState('posting something else here');

  // console.log(object)
  React.useEffect(
    () => {
      // const sub =
      const sub = navigation.addListener('focus', () => {
        HelperFunctions.getAsyncObjectData('user', (res) => setUser(res));
      });
    },
    [ navigation ]
  );

  const isParticipant = () => {
    // const part = events.find((event) => event._id === _id);
    return participating && participating.findIndex((el) => el.uid === user.uid) !== -1;
  };

  const isAttending = () => {
    // const attend = events.find((event) => event._id === _id);
    return attending && attending.findIndex((el) => el.uid === user.uid) !== -1;
  };

  return (
    <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: RFValue(15) }}>
      <Image
        source={{ uri: imageUrl || CONSTANTS.EVENTS_PIC }}
        resizeMode="cover"
        style={{ width: '100%', height: RFValue(300) }}
      />

      <View style={{ paddingHorizontal: RFValue(10) }}>
        <CommentsLikeButtons
          likeHandler={likeHandler}
          likes={likes}
          comments={comments}
          type="event"
          id={_id}
          extStyles={{ paddingHorizontal: 0 }}
        />
        <Text style={{ fontSize: RFValue(20), marginBottom: RFValue(10), fontWeight: 'bold' }}>{title}</Text>

        <Text style={{ fontSize: RFValue(20), paddingVertical: RFValue(10) }}>
          Entrance Fee: <Text style={{ fontWeight: 'bold' }}>{free ? 'FREE' : price}</Text>
        </Text>
        <Text style={{ fontSize: RFValue(14) }}>
          Date : {moment(startDate).format('DD/MMMM/YYYY')} - {moment(endDate).format('DD/MMMM/YYYY')}
        </Text>
        <Text style={{ fontSize: RFValue(14) }}>Venue: {venue}</Text>
        <Text style={{ fontSize: RFValue(14) }}>
          {attending && attending.length} going ・ {participating && participating.length} participants
        </Text>
        {/* <Text>{participating && participating.length}</Text> */}
        <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>Added {moment(dateCreated).fromNow()}</Text>

        {/* Tags */}
        <View style={{ flexDirection: 'row', marginVertical: RFValue(0), width: '100%', flexWrap: 'wrap' }}>
          {tags &&
            tags.map((tag) => (
              <View
                key={HelperFunctions.keyGenerator()}
                style={{
                  padding: RFValue(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                  borderRadius: RFValue(10),
                  marginRight: RFValue(5),
                  marginBottom: RFValue(5)
                }}
              >
                <Text style={{ color: 'green' }}>#{tag}</Text>
              </View>
            ))}
        </View>
        {/* End tags */}

        <Pressable
          onPress={() => navigation.navigate('Voting')}
          style={{
            width: '100%',
            backgroundColor: '#eee',
            height: RFValue(50),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(16) }}>Go to Voting</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: RFValue(10) }}>
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
            {/* <Icon name="map-marker" size={RFValue(30)} color="#fff" /> */}
            <Text style={{ fontSize: RFValue(14), color: '#fff', textAlign: 'center', marginLeft: RFValue(5) }}>
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
            {/* <Icon name="account-plus" size={RFValue(30)} color="#fff" /> */}
            <Text style={{ fontSize: RFValue(14), color: '#fff', textAlign: 'center', marginLeft: RFValue(5) }}>
              {isParticipant() ? 'Cancel Participation' : '+ Participate'}
            </Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10), fontWeight: 'bold' }}>
          About this event:
        </Text>
        <Text style={{ fontSize: RFValue(14) }}>{description}</Text>

        <View
          style={{
            width: '100%',
            // borderWidth: 1,
            marginTop: RFValue(10),
            borderColor: !visible ? 'transparent' : '#ddd'
          }}
        >
          <Pressable
            onPress={() => setVisible(!visible)}
            style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: RFValue(10)
            }}
          >
            <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>
              {visible ? 'Close' : 'Tap to view'} judging criteria:
            </Text>
            <Icon name={!visible ? 'chevron-down' : 'chevron-up'} size={RFValue(25)} color="#aaa" />
          </Pressable>
          {visible ? (
            <View style={{ padding: RFValue(10), borderWidth: 1, borderColor: '#eee', borderTopWidth: 0 }}>
              <Text style={{ fontSize: RFValue(14) }}>{judgingNotes}</Text>
              <Text style={{ fontSize: RFValue(12), marginVertical: RFValue(10), color: '#000', fontWeight: 'bold' }}>
                Number of judges ・ {noOfJudges} Judges
              </Text>
              <Text style={{ fontSize: RFValue(12), fontWeight: 'bold' }}>
                Event will be judged by ・ {judgingCriteria === 'both' ? 'Judges and Audience' : judgingCriteria}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(15) }}>Join the conversation below</Text>
        <View style={{ flexDirection: 'row', marginBottom: RFValue(15), width: '100%' }}>
          <View style={{ width: '10%' }}>
            <Image
              source={{ uri: (user && user.imageUrl) || CONSTANTS.DEFAULT_PROFILE }}
              style={{ marginRight: RFValue(10), width: RFValue(30), height: RFValue(30), borderRadius: RFValue(30) }}
            />
          </View>
          <View style={{ flexGrow: 1, paddingLeft: RFValue(10), width: '90%' }}>
            <TextInput
              style={{
                fontSize: RFValue(12),
                backgroundColor: '#eee',
                padding: RFValue(10),
                paddingTop: RFValue(10),
                minHeight: RFValue(200),
                maxHeight: RFValue(200)
              }}
              placeholder="Enter your comment..."
              textAlignVertical="top"
              multiline
              maxLength={300}
            />
            <Pressable
              onPress={() => postComment(comment)}
              style={{
                backgroundColor: '#010203',
                padding: RFValue(10),
                alignSelf: 'flex-end',
                marginTop: RFValue(10)
              }}
            >
              <Text style={{ color: '#fff' }}>comment</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {comments && !comments.length ? (
        <ComingSoon title="">
          <Pressable
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('NewEventComment', { eventId })}
          >
            <Icon name="message-text-outline" size={RFValue(30)} style={{ marginVertical: RFValue(20) }} color="#aaa" />
            <Text style={{ textAlign: 'center', color: '#aaa' }}>
              No comments yet, touch here to be the first one to add a comment...
            </Text>
          </Pressable>
        </ComingSoon>
      ) : null}
    </View>
  );
};

export default Header;
