import React from 'react';
import { View, Text, FlatList, Pressable, Alert, Dimensions, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseURL } from '../../Store/Axios';
import io from 'socket.io-client';
import moment from 'moment';
import {
  BLACK,
  FIRESTORE,
  GRAY,
  HALF_BLACK,
  HALF_WHITE,
  HEIGHT,
  SHADOW,
  THEME_COLOR,
  THEME_COLOR3,
  WHITE
} from '../../Utils/Constants';
import { HelperFunctions } from '../../Utils';
import { BottomSheet, Buton, Button, DesignIcon, Input, Typo } from '../../Components';
import { getUniqueId } from 'react-native-device-info';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { keyGenerator } from '../../Utils/HelperFunctions';
import NewVoteEvent from './NewVoteEvent';

navigator.__defineGetter__('userAgent', () => 'react-native');

const { height } = Dimensions.get('window');
let socket;
const Voting = ({ navigation, route }) => {
  // const {} = useSelector((state) => state.Account);
  const [ room, setRoom ] = React.useState({ users: 0, participants: [], votes: [] });
  const [ event, setEvent ] = React.useState({});
  const [ votingEvents, setVotingEvents ] = React.useState([]);
  const [ modal, setModal ] = React.useState(false);
  const [ roomId, setUser ] = React.useState({});
  const [ participant, setParticipant ] = React.useState('');
  const [ votes, setVotes ] = React.useState([]);
  const deviceId = getUniqueId();
  const dispatch = useDispatch();

  // const socketURL = 'wss://dancebox-309908.uc.r.appspot.com';
  const socketURL = `http://192.168.1.100:8080`;
  React.useEffect(() => {
    socket = SocketIOClient(socketURL, { jsonp: false });
    // socket.emit('join-server', { deviceId });

    // socket.emit('create-room', (room) => {
    //   console.log('Created room ', room);
    // });
    // socket.on('update', (usr) => {
    //   console.log('update', usr.votes);
    //   setRoom({ ...room, ...usr });
    //   setParticipant('');
    // });

    // socket.on('new-votes', (vots) => {
    //   // console.log('Votes', vots);
    //   setVotes(vots);
    // });

    return () => {
      // socket.emit('delete-room');
      // socket.emit('leave-room', { roomId: route.params.eventId, deviceId });
      // socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const sub = FIRESTORE.collection('voting').onSnapshot((snaps) => {
      const docs = [ ...snaps.docs.map((r) => ({ ...r.data(), id: r.id })) ];
      setVotingEvents(docs);
    });
    // return sub;
  }, []);

  // console.log('AUTHOR OR NOT', event.authorId === user._id, event.authorId, user._id);

  const getEvent = () => {
    // dispatch.Events.getEvent({
    //   eventId: route.params.eventId,
    //   callback: (res) => {
    //     if (!res.success) return Alert.alert('Error getting event', res.result);
    //     setEvent(res.result);
    //     console.log('Got EVENT', res.result);
    //   }
    // });
  };

  const getUser = async () =>
    await HelperFunctions.getAsyncObjectData('user', ({ result: user, success }) => setUser(user));

  const voteNow = () => socket.emit('vote', {});

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('VotingRoom', { room: item })}
        style={{
          width: '100%',
          // borderWidth: 1,
          // backgroundColor: '#D4E4F6',
          // backgroundColor: '#91C8CC',
          backgroundColor: '#3C925F',
          borderRadius: RFValue(10),
          padding: RFValue(10),
          // height: RFValue(100),
          width: '100%',
          marginTop: index === 0 ? RFValue(15) : 0,
          marginBottom: index + 1 === (votingEvents && votingEvents.length) ? 0 : RFValue(15)
          // shadowColor: '#aaa',
          // ...SHADOW
          // elevation: RFValue(8)
        }}
      >
        <Typo text={item.title} style={{ textTransform: 'capitalize', fontWeight: 'bold' }} size={18} color={WHITE} />

        <Typo
          text={`Event expires • ${moment(moment(item.dateCreated).add(24, 'hours')).fromNow()}`}
          style={{}}
          // size={12}
          color={WHITE}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typo
            text={`${moment(item.dateCreated).format('dddd, Do-MMMM-YYYY')}`}
            style={{}}
            size={12}
            color={HALF_WHITE}
          />
          <Typo
            text={`${item.votes ? item.votes.length : 0} votes so far`}
            style={{
              marginVertical: RFValue(5),
              backgroundColor: '#D5A828',
              alignSelf: 'flex-start',
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(5),
              borderRadius: RFValue(50)
            }}
            size={14}
            // color="#5CEF75"
            color="#fff"
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={modal} closeModal={closeModal} extStyles={{ top: 0 }}>
        <NewVoteEvent closeModal={closeModal} />
      </BottomSheet>

      <Pressable
        onPress={openModal}
        style={{
          width: RFValue(50),
          height: RFValue(50),
          borderRadius: RFValue(100),
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backgroundColor: THEME_COLOR,
          // ...SHADOW,
          // shadowOpacity: 5,
          // elevation: RFValue(10),
          // shadowColor: '#000',
          position: 'absolute',
          bottom: RFValue(10),
          right: RFValue(10)
        }}
      >
        <DesignIcon name="plus" pkg="ad" color={WHITE} onPress={openModal} />
      </Pressable>
      {/* PARTICIPANT LIST */}
      <View style={{ flexGrow: 1, backgroundColor: WHITE }}>
        <FlatList
          keyExtractor={(item) => item.id}
          style={{ flex: 1, marginHorizontal: RFValue(8) }}
          data={votingEvents}
          // ListHeaderComponent={() => (
          // )}
          renderItem={renderItem}
        />
        {/* END PARTICIPANT LIST */}
      </View>
    </View>
  );
};

export default Voting;
