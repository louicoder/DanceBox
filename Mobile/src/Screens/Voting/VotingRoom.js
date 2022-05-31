import { View, Text, Dimensions, ScrollView, Pressable } from 'react-native';
import React from 'react';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import { getUniqueId } from 'react-native-device-info';
import { RFValue } from 'react-native-responsive-fontsize';
import { Buton, DesignIcon, Typo } from '../../Components';
import { FIRESTORE, HALF_BLACK, WHITE } from '../../Utils/Constants';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { showAlert } from '../../Utils/HelperFunctions';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

navigator.__defineGetter__('userAgent', () => 'react-native');

const { height } = Dimensions.get('window');
let socket;
const VotingRoom = ({ route, navigation }) => {
  const deviceId = getUniqueId();
  const [ votingEvent, setVotingEvent ] = React.useState({ title: '', options: [], vote: '' });
  const [ votes, setVotes ] = React.useState([]);
  const [ users, setUsers ] = React.useState([]);
  const { user } = useSelector((st) => st.Account);

  const socketURL = 'wss://dance-box-2022.el.r.appspot.com';
  // const socketURL = `http://192.168.1.100:8080`;
  React.useEffect(
    () => {
      // if (route.params && route.params.room) setVotingEvent(route.params.room);
      // console.log('Route', route.params);
      socket = SocketIOClient(socketURL, { jsonp: false });
      // socket.emit('join-server', { deviceId });

      socket.emit('join-room', { roomId: route.params.room.id, uid: user.uid });

      socket.on('new-user', (users) => {
        // console.log('USERS', users);
        return setUsers(users);
      });

      return () => {
        // socket.emit('delete-room');
        socket.emit('leave-room', { roomId: route.params.room.id, uid: user.uid });
        // socket.disconnect();
      };
    },
    [ setUsers, route.params ]
  );

  React.useEffect(() => {
    // if (route.params && route.params.room)
    const sub = FIRESTORE.collection('voting').doc(route.params.room.id).onSnapshot((doc) => {
      setVotingEvent({ ...votingEvent, ...doc.data(), id: doc.id });
      setVotes([ ...(doc.data().votes || []) ]);
    });

    return () => sub();
  }, []);

  // submit vote for saving::
  const voteHandler = (option) => setVotingEvent({ ...votingEvent, vote: option.id });

  const postVote = async () => {
    try {
      //
      const option = votingEvent && votingEvent.options.find((r) => r.id === votingEvent.vote);
      const newVote = {
        ...option,
        uid: user.uid,
        dateCreated: new Date().toISOString(),
        user: user.username || user.name || user.email
      };
      const payload = { votes: [ ...votes, newVote ] };
      console.log('Voted', votingEvent.id);

      await FIRESTORE.collection('voting').doc(votingEvent.id).set(payload, { merge: true }).then(() => {
        showAlert('Success', 'You have successfully voted. wait while other also vote');
        return navigation.goBack();
      });
    } catch (error) {
      return showAlert('Something went wrong', error.message);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: RFValue(10) }}>
      {/* <Text>VotingRoom:</Text> */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typo
          text={`${users && users.length} online`}
          color={WHITE}
          style={{
            backgroundColor: '#3BBA33',
            alignSelf: 'flex-start',
            paddingHorizontal: RFValue(10),
            paddingVertical: RFValue(5),
            marginTop: RFValue(20),
            marginRight: RFValue(5),
            borderRadius: RFValue(50)
          }}
        />
        <Typo
          text={`${votes && votes.length} Votes so far `}
          style={{
            backgroundColor: '#eee',
            alignSelf: 'flex-start',
            paddingHorizontal: RFValue(10),
            paddingVertical: RFValue(5),
            marginTop: RFValue(20),
            borderRadius: RFValue(50)
          }}
        />
      </View>
      <Typo text={route.params.room.title} size={20} style={{ marginVertical: RFValue(15), fontWeight: 'bold' }} />
      <Typo text="Please note that you can only vote once for an event. To vote, click an option of your choice" />
      <Typo
        text="Options to vote (select one)."
        size={16}
        style={{ marginVertical: RFValue(10), fontWeight: 'bold' }}
      />

      {votingEvent &&
        votingEvent.options &&
        votingEvent.options.map((r, index) => {
          const same = votingEvent.vote === r.id;
          return (
            <Pressable
              key={r.id}
              onPress={() =>
                votes && !votes.find((r) => r.uid === user.uid)
                  ? voteHandler(r)
                  : showAlert('Already voted!', 'You have already voted, you cannot vote again!')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: RFValue(10),
                borderWidth: same ? 1 : 1,
                paddingVertical: RFValue(10),
                paddingHorizontal: RFValue(10),
                borderColor: !same ? '#D0ECFE' : '#2F3CDB',
                backgroundColor: '#D0ECFE',
                borderRadius: RFValue(8)
              }}
            >
              <Typo text={r.value} style={{ flexShrink: 1 }} size={14} />
              {same ? (
                <DesignIcon name="check" pkg="mc" />
              ) : !votes.find((r) => r.uid === user.uid) ? (
                <DesignIcon name="chevron-right" pkg="mc" />
              ) : null}
              {votes && votes.find((r) => r.uid === user.uid) ? (
                <Typo
                  text={`${votes && votes.filter((r) => r.uid === user.uid).length / votes.length * 100}%`}
                  style={{
                    fontWeight: 'bold',
                    backgroundColor: '#47026c',
                    padding: RFValue(5),
                    borderRadius: RFValue(5),
                    color: WHITE
                  }}
                  size={16}
                />
              ) : null}
            </Pressable>
          );
        })}
      <Buton
        title="Submit Vote"
        onPress={() =>
          votes.find((r) => r.uid === user.uid)
            ? showAlert('Already voted!', 'You have already voted, you cannot vote again!')
            : postVote()}
      />
    </ScrollView>
  );
};

export default VotingRoom;
