import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseURL } from '../../Store/Axios';
import io from 'socket.io-client';
import { THEME_COLOR } from '../../Utils/Constants';
import { HelperFunctions } from '../../Utils';

navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
}); 
import SocketIOClient from "socket.io-client/dist/socket.io.js";


let socket;
const Voting = ({ navigation, route }) => {
  // const {} = useSelector((state) => state.Account);
  const [ user, setUser ] = React.useState({});
  const [ users, setUsers ] = React.useState([]);
  const [ votes, setVotes ] = React.useState([]);
  React.useEffect(
    () => {
      // console.log('Route', route.params.user);
      // socket = io(`${baseURL}`, { transports: ['websocket'] });
      socket = SocketIOClient("wss://dancebox-309908.uc.r.appspot.com", {
      jsonp: false
    });
      socket.emit('join server', { user: route.params?.user , room: route.params?.eventId });
      socket.on('new user', (users) => setUsers(users));
      socket.on('new vote', (votes) => setVotes(votes));
      return () => {
        socket.disconnect();
      };
    },
    []
  );

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        getUser();
      });
      return () => sub;
    },
    [ navigation ]
  );

  const getEvent = () => {
    // dispatch.Account.getEvent();
  };

  const getUser = async() =>
    await HelperFunctions.getAsyncObjectData('user', ({ result: user, success }) => user);
  
  const voteNow = () => socket.emit('vote', { user: route.params?.user })

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: RFValue(0), flexDirection: 'row' }}>
        <View style={{ width: '50%', backgroundColor: 'green', padding: RFValue(15) }}>
          <Text style={{ fontSize: RFValue(20), textAlign: 'center', color: '#fff' }}>
            {users && users.length} online
          </Text>
        </View>
        <View style={{ width: '50%', backgroundColor: THEME_COLOR, padding: RFValue(15) }}>
          <Text style={{ fontSize: RFValue(20), textAlign: 'center', color: '#fff' }}>{votes && votes.length} votes</Text>
        </View>
      </View>

      <View style={{ marginVertical: RFValue(10), paddingHorizontal: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(16) }}>Participants</Text>
        <Pressable onPress={voteNow}><Text>Vote now</Text></Pressable>
      </View>
      <View style={{ flexGrow: 1 }}>
        <FlatList
          keyExtractor={() => HelperFunctions.keyGenerator()}
          style={{ flex: 1, paddingHorizontal: RFValue(10) }}
          data={[ 0, 2, 3, 4, 5, 6, 75, 3, 3, 4, 5 ]}
          // ListHeaderComponent={() => (
          // )}
          renderItem={() => (
            <View
              style={{
                height: RFValue(80),
                // borderWidth: 1,
                marginBottom: RFValue(10),
                width: '100%',
                backgroundColor: '#eeeeee70',
                height: RFValue(100)
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Voting;
