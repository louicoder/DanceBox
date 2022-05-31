import React from 'react';
import { View, Text, Keyboard } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import { getUniqueId } from 'react-native-device-info';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { DesignIcon, Input, Typo } from '../../Components';
import { FlatList } from 'react-native-gesture-handler';
import { FIRESTORE, GRAY, HEIGHT, WHITE } from '../../Utils/Constants';
import { showAlert } from '../../Utils/HelperFunctions';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import { useKeyboard } from '../../Utils/useKeyboardHeight';
import FastImage from 'react-native-fast-image';
import randomColor from 'randomcolor';

navigator.__defineGetter__('userAgent', () => 'react-native');
let socket;
const color = randomColor({
  luminosity: 'light',
  hue: 'orange'
});
const green = randomColor({
  luminosity: 'dark',
  hue: 'green'
});
const CommunityChat = () => {
  const flatlistRef = React.useRef();
  const deviceId = getUniqueId();
  const { user } = useSelector((st) => st.Account);
  const [ users, setUsers ] = React.useState([]);
  const [ msg, setMsg ] = React.useState('');
  const [ messages, setMessages ] = React.useState([]);
  // const [ keyboardHeight ] = useKeyboard();

  // console.log('KEYBOARD  HEIGHT', keyboardHeight);

  // const socketURL = 'wss://dancebox-309908.uc.r.appspot.com';
  const socketURL = 'https://dance-box-2022.el.r.appspot.com';
  // const socketURL = `http://192.168.1.100:8080`;
  React.useEffect(() => {
    socket = SocketIOClient(socketURL, { jsonp: false });
    socket.emit('join-server', {
      deviceId,
      name: user.name,
      image: user.photoURL,
      username: user.username,
      email: user.email,
      uid: user.uid
    });

    socket.on('joined-server', (usr) => {
      console.log('Joined server client ', usr);
      setUsers(usr);
    });

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
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const det = moment(new Date()).format('DD-MM-YYYY');
    const sub = FIRESTORE.collection('community-chat').doc(det).collection('chats').onSnapshot((snap) => {
      const docs = [ ...snap.docs.map((r) => ({ ...r.data(), id: r.id })) ].sort(
        (a, b) => moment(a.dateCreated) - moment(b.dateCreated)
      );
      setMessages(docs);
      setMsg('');
    });

    return sub;
  }, []);

  // React.useEffect(() => {
  //   Keyboard.addListener('keyboardWillShow', () => {
  //     //
  //   });

  //   Keyboard.addListener('keyboardWillHide', () => {
  //     //
  //   });
  //   return () => {
  //     Keyboard.removeAllListeners();
  //   };
  // }, []);

  const onChangeText = (e) => setMsg(e);

  const sendMessage = async () => {
    // send message
    if (!msg || msg.length < 1) return;
    // showAlert('Too short', 'the message is too short, cannot send');
    const det = moment(new Date()).format('DD-MM-YYYY');
    const payload = {
      name: user.username || user.name,
      email: user.email,
      dateCreated: new Date().toISOString(),
      image: user.photoURL || '',
      message: msg,
      uid: user.uid
    };
    await FIRESTORE.collection('community-chat').doc(det).collection('chats').add(payload);
  };

  const renderItem = ({ item, index }) => {
    const same = item.uid === user.uid;
    return (
      <View
        style={{
          flexDirection: same ? 'row-reverse' : 'row',
          alignSelf: same ? 'flex-end' : 'flex-start',
          marginTop: index === 0 ? RFValue(40) : 0
          // backgroundColor: 'green'
          // width: '100%'
        }}
      >
        <View
          style={{
            width: RFValue(30),
            height: RFValue(30),
            borderRadius: RFValue(90),
            marginHorizontal: RFValue(5),
            backgroundColor: '#eee',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {item.image ? (
            <FastImage
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%', borderRadius: RFValue(90) }}
              resizeMode="cover"
            />
          ) : (
            <DesignIcon name="user" pkg="ad" size={20} color={GRAY} />
          )}
        </View>

        <View
          style={{
            // borderWidth: 1,
            backgroundColor: same ? '#70dbff' : '#eeeeee',
            maxWidth: '60%',
            borderRadius: RFValue(20),
            borderTopLeftRadius: !same ? 0 : RFValue(20),
            borderTopRightRadius: same ? 0 : RFValue(20),

            padding: RFValue(10),
            // marginBottom: RFValue(15),
            // alignSelf: same ? 'flex-end' : 'flex-start',
            marginBottom: index + 1 === (messages && messages.length) ? RFValue(100) : RFValue(15)
          }}
        >
          <Typo text={item.name} size={11} style={{ fontWeight: 'bold', textAlign: same ? 'right' : 'left' }} />
          <Typo
            text={item.message}
            size={12}
            style={{ marginVertical: RFValue(3), textAlign: same ? 'right' : 'left' }}
          />
          <Typo
            text={`${moment.utc(item.dateCreated).format('DD-MMMM-YYYY')} • ${moment.utc(item.dateCreated).fromNow()}`}
            size={10}
            color={same ? '#00000050' : '#aaa'}
            style={{ fontStyle: 'normal', textAlign: same ? 'right' : 'left' }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            // width: '100%',
            height: RFValue(25),
            justifyContent: 'center',
            // backgroundColor: '#7FFF00',
            // position: 'absolute',
            backgroundColor: `#35d475`,
            zIndex: 200,
            position: 'absolute',
            alignItems: 'center',
            left: RFValue(10),
            top: RFValue(10),
            paddingHorizontal: RFValue(10),
            // alignSelf: 'center',
            // padding: RFValue(5),
            borderRadius: RFValue(50)
            // textAlign: 'center'
          }}
        >
          <Typo
            text={`${users && users.length} online`}
            color="#fff"
            size={12}
            style={{
              // width: '40%',
              // zIndex: 200,
              // alignSelf: 'center',
              // padding: RFValue(5),
              // borderRadius: RFValue(50),
              // textAlign: 'center'
            }}
          />
        </View>
        <AutoScrollFlatList
          style={{ flex: 1, paddingBottom: RFValue(50) }}
          ref={flatlistRef}
          threshold={20}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          height: RFValue(50),
          bottom: 0,
          width: '100%',
          backgroundColor: '#eee',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: RFValue(10),
          position: 'absolute'
        }}
      >
        <Input
          titleStyles={{ marginBottom: 0 }}
          value={msg}
          onChangeText={onChangeText}
          onSubmitEditing={sendMessage}
          placeholder="Enter message"
          style={{ flexGrow: 1 }}
          extStyles={{ marginBottom: 0, flexShrink: 1 }}
          extInputStyles={{ marginBottom: 0, paddingHorizontal: 0, marginTop: 0 }}
        />
        <Typo text="Send" color="blue" onPress={sendMessage} pressable style={{ marginLeft: RFValue(10) }} />
      </View>
    </View>
  );
};

export default CommunityChat;
