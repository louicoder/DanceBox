import React from 'react';
import { View, Text, FlatList, Pressable, Alert, Dimensions, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseURL } from '../../Store/Axios';
import io from 'socket.io-client';
import moment from 'moment';
import {
  BLACK,
  DARK_BLUE,
  DARK_GREEN,
  FIRESTORE,
  GRAY,
  HALF_BLACK,
  HALF_WHITE,
  HEIGHT,
  LIGHT_BLUE,
  LIGHT_GREEN,
  SHADOW,
  THEME_COLOR,
  THEME_COLOR3,
  WHITE,
  WIDTH
} from '../../Utils/Constants';
import { HelperFunctions } from '../../Utils';
import { BottomSheet, Buton, Button, DesignIcon, Input, Typo } from '../../Components';
import { getUniqueId } from 'react-native-device-info';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { keyGenerator } from '../../Utils/HelperFunctions';
import NewVoteEvent from './NewVoteEvent';

navigator.__defineGetter__('userAgent', () => 'react-native');

const { height } = Dimensions.get('window');
let socket;
const Voting = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.Account);
  const [ room, setRoom ] = React.useState({ users: 0, participants: [], votes: [] });
  const [ event, setEvent ] = React.useState({});
  const [ votingEvents, setVotingEvents ] = React.useState([]);
  const [ modal, setModal ] = React.useState(false);
  const [ roomId, setUser ] = React.useState({});
  const [ participant, setParticipant ] = React.useState('');
  const [ votes, setVotes ] = React.useState([]);
  const deviceId = getUniqueId();
  const dispatch = useDispatch();

  const socketURL = 'wss://dance-box-2022.el.r.appspot.com';
  // const socketURL = `http://192.168.1.100:8080`;
  React.useEffect(() => {
    // socket = SocketIOClient(socketURL, { jsonp: false });
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
    const timeDifference = moment(new Date().toISOString()).diff(item.dateCreated, 'hours');
    console.log('Diff', timeDifference);

    const votedOrNot = item.votes && item.votes.find((r) => r.uid === user.uid);
    return (
      <View
        // onPress={() => navigation.navigate('VotingRoom', { room: item })}
        style={{
          // width: '100%',
          borderWidth: 1,
          borderColor: `${DARK_GREEN}70`,
          alignSelf: 'center',
          width: WIDTH - RFValue(20),
          backgroundColor: '#fff',
          // backgroundColor: '#91C8CC',
          // backgroundColor: '#FCBB40',
          borderRadius: RFValue(10),
          padding: RFValue(10),
          paddingVertical: RFValue(15),
          // height: RFValue(100),
          // width: '100%',
          marginTop: index === 0 ? RFValue(20) : 0,
          marginBottom: index + 1 === (votingEvents && votingEvents.length) ? RFValue(70) : RFValue(20),
          // ...SHADOW,
          shadowColor: '#000'
          // shadowOffset: { width: 0, height: RFValue(10) }
          // elevation: RFValue(8)
        }}
      >
        <View style={{ position: 'absolute', right: RFValue(10), top: RFValue(10) }}>
          <DesignIcon
            name={timeDifference > 24 ? 'lock' : 'unlock'}
            pkg="fa"
            size={20}
            color={timeDifference > 24 ? 'red' : 'green'}
            withBorder
          />
        </View>
        <Typo
          text={item.title}
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            marginBottom: RFValue(10),
            marginRight: RFValue(50)
          }}
          size={18}
          color={BLACK}
        />

        {/* <Typo
          text={`Expires • ${moment(moment(item.dateCreated).add(24, 'hours')).fromNow()}`}
          style={{}}
          // size={12}
          // color={WHITE}
        /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: RFValue(5) }}>
            <DesignIcon name="calendar" extStyles={{ marginRight: RFValue(10) }} />
            <Typo
              text={`${moment(item.dateCreated).format('dddd, Do - MMMM - YYYY')}`}
              style={{}}
              // size={12}
              // color={HALF_WHITE}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DesignIcon name="chart" pkg="sim" extStyles={{ marginRight: RFValue(10) }} />
          <Typo
            text={`${item.votes ? item.votes.length : 0} • total votes`}
            style={{}}
            // size={12}
            // color={HALF_WHITE}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: RFValue(5),
            // borderWidth: 1,
            width: '100%'
          }}
        >
          <DesignIcon name="clock" pkg="sim" extStyles={{ marginRight: RFValue(10) }} />
          <Typo
            text={`${timeDifference > 24
              ? 'This event is over the due date for voting and votes will not be valid anymore'
              : 'Your votes are valid for this event'}`}
            style={{ color: timeDifference > 24 ? 'red' : 'green', flexShrink: 1, fontWeight: 'normal' }}
            // size={12}
            // color={HALF_WHITE}
          />
        </View>

        <Buton
          title={votedOrNot ? 'Show Voting Results' : 'go To Voting'}
          extStyles={{ marginTop: RFValue(5), backgroundColor: LIGHT_BLUE, height: RFValue(35) }}
          textStyles={{ color: DARK_BLUE }}
          onPress={() => navigation.navigate('VotingRoom', { room: item })}
        />
      </View>
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
          position: 'absolute',
          bottom: RFValue(10),
          right: RFValue(10)
        }}
      >
        <DesignIcon name="plus" pkg="ad" color={WHITE} onPress={openModal} />
      </Pressable>
      {/* PARTICIPANT LIST */}
      <View style={{ flexGrow: 1, paddingHorizontal: RFValue(0) }}>
        <FlatList
          keyExtractor={(item) => item.id}
          style={{ flexGrow: 1, paddingHorizontal: RFValue(0) }}
          data={votingEvents}
          showsVerticalScrollIndicator={false}
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
