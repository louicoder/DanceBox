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
  const { user } = useSelector((state) => state.Account);
  const [ visible, setVisible ] = React.useState(false);
  const [ comment, setComment ] = React.useState('posting something else here');

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
        <Text style={{ fontSize: RFValue(20), marginVertical: RFValue(10) }}>{title}</Text>
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
        <KeyboardAwareScrollView extraScrollHeight={60}>
          <View style={{ flexDirection: 'row', borderWidth: 1 }}>
            <Image
              src={user && user.imageUrl}
              style={{ marginRight: RFValue(10), width: RFValue(30), height: RFValue(30), borderRadius: RFValue(30) }}
            />
            <View style={{ width: '100%' }}>
              <TextInput
                style={{ backgroundColor: '#eee', width: '100%' }}
                placeholder="Enter your comment..."
                textAlignVertical="top"
                multiline
              />
              <Pressable onPress={() => postComment(comment)}>
                <Text>comment</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
