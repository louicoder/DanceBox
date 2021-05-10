import moment from 'moment';
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ComingSoon from '../../../Components/ComingSoon';
import CommentsLikeButtons from '../../../Components/CommentsLikeButtons';
import { CONSTANTS } from '../../../Utils';

const Header = ({
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
  price,
  judgingNotes,
  startDate,
  endDate,
  // participate,
  // unParticipate,
  // attend,
  // unAttend,
  attendParticipate,
  unattendUnparticipate,
  navigation,
  eventId,
  ...rest
}) => {
  const { user } = useSelector((state) => state.Account);
  const { events } = useSelector((state) => state.Events);
  const [ visible, setVisible ] = React.useState(false);

  const isParticipant = () => {
    const part = events && events.find((event) => event._id === _id);
    return part && part.participating.findIndex((el) => el.uid === user.uid) !== -1;
  };

  const isAttending = () => {
    const attend = events && events.find((event) => event._id === _id);
    return attend && attend.attending.findIndex((el) => el.uid === user.uid) !== -1;
  };

  // const likes = events && events.find((event) => event._id === _id).likes;

  // console.log(isAttending())

  return (
    <View style={{ width: '100%', backgroundColor: '#fff', marginBottom: RFValue(15) }}>
      <Image
        source={{ uri: imageUrl || CONSTANTS.EVENTS_PIC }}
        resizeMode="cover"
        style={{ width: '100%', height: RFValue(300) }}
      />
      <View style={{ paddingHorizontal: RFValue(10) }}>
        <CommentsLikeButtons
          likes={likes}
          comments={comments}
          type="event"
          id={_id}
          extStyles={{ paddingHorizontal: 0 }}
        />
        <Text style={{ fontSize: RFValue(14) }}>
          Date : {moment(startDate).format('DD/MMMM/YYYY')} - {moment(endDate).format('DD/MMMM/YYYY')}
        </Text>
        <Text style={{ fontSize: RFValue(14) }}>Venue: {venue}</Text>
        <Text style={{ fontSize: RFValue(14) }}>
          {attending && attending.length} going ・ {participating && participating.length} participants
        </Text>
        {/* <Text>{participating && participating.length}</Text> */}
        <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>Added {moment(dateCreated).fromNow()}</Text>

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
              {isParticipant() ? 'Cancel Attendance' : '+ Attend'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              isParticipant() ? unattendUnparticipate('unparticipate') : attendParticipate('participate')}
            style={{
              height: RFValue(50),
              width: '49%',
              // backgroundColor: events && isParticipant() ? '#aaa' : '#010203',
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
            borderWidth: 1,
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
            <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>JUDGING CRITERIA:</Text>
            <Icon name={!visible ? 'chevron-down' : 'chevron-up'} size={RFValue(25)} color="#aaa" />
          </Pressable>
          {visible ? (
            <View style={{ padding: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(14) }}>{judgingNotes}</Text>
              <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10), color: '#aaa' }}>
                Judged by ・ {noOfJudges} Judges
              </Text>
              <Text style={{ fontSize: RFValue(14) }}>
                Event judged by ・ {judgingCriteria === 'both' ? 'Judges + Audience' : judgingCriteria}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(15) }}>Join the conversation below</Text>
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
