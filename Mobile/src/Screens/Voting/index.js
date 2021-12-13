import React from 'react';
import { View, Text, FlatList, Pressable, Alert, Dimensions, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseURL } from '../../Store/Axios';
import io from 'socket.io-client';
import { THEME_COLOR } from '../../Utils/Constants';
import { HelperFunctions } from '../../Utils';
import { BottomSheet, Button, DesignIcon, Input } from '../../Components';
import { getUniqueId } from 'react-native-device-info';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { keyGenerator } from '../../Utils/HelperFunctions';

navigator.__defineGetter__('userAgent', () => 'react-native');

const { height } = Dimensions.get('window');
let socket;
const Voting = ({ navigation, route }) => {
  // const {} = useSelector((state) => state.Account);
  const [ room, setRoom ] = React.useState({ users: 0, participants: [], votes: [] });
  const [ event, setEvent ] = React.useState({ ...route.params.event });
  const [ participants, setParticipants ] = React.useState([]);
  const [ modal, setModal ] = React.useState(false);
  const [ user, setUser ] = React.useState({ ...route.params.user });
  const [ participant, setParticipant ] = React.useState('');
  const [ votes, setVotes ] = React.useState([]);
  const deviceId = getUniqueId();
  const dispatch = useDispatch();

  // const socketURL = 'wss://dancebox-309908.uc.r.appspot.com';
  const socketURL = 'http://192.168.90.163:8080';
  React.useEffect(
    () => {
      // Alert.alert('Voting criteria', 'You only get to vote once and your decision is final, please vote wisely');
      socket = SocketIOClient(socketURL, { jsonp: false });
      socket.emit('join-server', { deviceId, room: route.params && route.params.eventId });

      socket.on('update', (usr) => {
        console.log('update', usr.votes);
        setRoom({ ...room, ...usr });
        setParticipant('');
      });

      socket.on('new-votes', (vots) => {
        console.log('Votes', vots);
        setVotes(vots);
      });

      return () => {
        socket.emit('leave-room', { roomId: route.params.eventId, deviceId });
        // socket.disconnect();
      };
    },
    [ setRoom, setVotes ]
  );

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        // getUser();
        // getEvent();
        navigation.setParams({ openModal: () => openModal(), author: event.authorId === user._id });
      });
      return () => sub;
    },
    [ navigation ]
  );

  console.log('AUTHOR OR NOT', event.authorId === user._id, event.authorId, user._id);

  const getEvent = () =>
    dispatch.Events.getEvent({
      eventId: route.params.eventId,
      callback: (res) => {
        if (!res.success) return Alert.alert('Error getting event', res.result);
        setEvent(res.result);
        console.log('Got EVENT', res.result);
      }
    });

  const getUser = async () =>
    await HelperFunctions.getAsyncObjectData('user', ({ result: user, success }) => setUser(user));

  const voteNow = () => socket.emit('vote', { user: route.params && route.params.user });

  const openModal = React.useCallback(
    () => {
      setModal(true);
    },
    [ setModal ]
  );

  const closeModal = React.useCallback(
    () => {
      setModal(false);
    },
    [ setModal ]
  );

  const addParticipant = () => {
    console.log('Participant', participant);
    if (participant) {
      const user = {
        name: participant,
        room: route.params.eventId,
        cb: () => setParticipant(''),
        id: keyGenerator()
      };
      socket.emit('add-participant', user);
    }
    // return;
  };

  const removeParticipant = (id) => {
    return socket.emit('remove-participant', { id, room: route.params.eventId });
  };

  const vote = (usr) => {
    // console.log('VOTE OBJ', usr);
    const voteObject = { voter: deviceId, voted: usr.id, room: route.params.eventId };
    socket.emit('vote', voteObject);
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={modal} closeModal={closeModal} extStyles={{}}>
        <View style={{ height, width: '100%', paddingHorizontal: RFValue(10), paddingTop: useSafeAreaInsets().top }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: RFValue(15)
            }}
          >
            <Text style={{ flexShrink: 1, marginRight: RFValue(15), fontSize: RFValue(16) }}>
              Add all the participants so they can appear on the voting list
            </Text>
            <DesignIcon name="close" pkg="ad" withBorder onPress={closeModal} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Input
              placeholder="Participant name"
              onSubmitEditing={addParticipant}
              onChangeText={(p) => setParticipant(p)}
              extStyles={{ flexShrink: 1 }}
            />
            <Button title="Add" extStyles={{ width: '20%' }} onPress={addParticipant} />
          </View>
          <ScrollView style={{ flexGrow: 1 }}>
            {room.participants.map((p, i) => (
              <Pressable
                key={p.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: i + 1 === room.participants.length ? 0 : 1,
                  borderColor: '#eee',
                  paddingVertical: RFValue(20)
                }}
              >
                <Text style={{ fontSize: RFValue(18), textTransform: 'capitalize' }}>{p.name}</Text>
                <DesignIcon name="close" pkg="ad" onPress={() => removeParticipant(p.id)} />
              </Pressable>
            ))}
          </ScrollView>
          {/* <Text>{JSON.stringify(room.participants)}</Text> */}
        </View>
      </BottomSheet>

      <View style={{ padding: RFValue(0), flexDirection: 'row' }}>
        <View style={{ width: '50%', backgroundColor: 'green', padding: RFValue(15) }}>
          <Text style={{ fontSize: RFValue(20), textAlign: 'center', color: '#fff' }}>
            {room && room.users && room.users.length} online
          </Text>
        </View>
        <View style={{ width: '50%', backgroundColor: THEME_COLOR, padding: RFValue(15) }}>
          <Text style={{ fontSize: RFValue(20), textAlign: 'center', color: '#fff' }}>
            {votes && votes.length} votes
          </Text>
        </View>
      </View>

      {/* PARTICIPANT LIST */}
      <View style={{ flexGrow: 1 }}>
        <FlatList
          keyExtractor={() => HelperFunctions.keyGenerator()}
          style={{ flex: 1, paddingHorizontal: RFValue(10) }}
          data={room.participants}
          // ListHeaderComponent={() => (
          // )}
          renderItem={({ item }) => (
            <View
              style={{
                // borderWidth: 1,
                marginBottom: RFValue(10),
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: RFValue(10),
                width: '100%',
                backgroundColor: '#eeeeee70',
                height: RFValue(70)
              }}
            >
              <View>
                <Text style={{ fontSize: RFValue(20), fontWeight: 'normal' }}>{item.name}</Text>
                <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>{item.votes} votes</Text>
              </View>
              {votes && !votes.reduce((p, c) => [ ...p, c.voter ], []).includes(deviceId) ? (
                <Pressable
                  onPress={() => vote(item)}
                  style={{
                    height: RFValue(30),
                    // width: RFValue(40),
                    paddingHorizontal: RFValue(10),
                    borderRadius: 5,
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* <DesignIcon name="plus" pkg="ad" size={16} color="#fff" /> */}
                  <Text style={{ fontSize: RFValue(14), color: '#fff' }}>Vote</Text>
                </Pressable>
              ) : (
                <View>
                  <Text>{votes.filter((v) => v.voted === item.id).length}</Text>
                </View>
              )}
            </View>
          )}
        />
        {/* END PARTICIPANT LIST */}
      </View>
    </View>
  );
};

export default Voting;
