import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseURL } from '../../Store/Axios';
import io from 'socket.io-client';

let socket;
const Voting = ({ navigation }) => {
  // const {} = useSelector((state) => state.Account);
  React.useEffect(
    () => {
      socket = io(baseURL);

      socket.emit('message', 'hi there');

      return () => socket.disconnect();
    },
    [ navigation ]
  );

  const getEvent = () => {
    //
    // dispatch.Account.getEvent();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: RFValue(100) }} />

      <FlatList
        style={{ flexShrink: 1, backgroundColor: '#eee' }}
        items={[ 0, 2, 3, 4, 5, 6, 75, 3, 3, 4, 5 ]}
        renderItem={() => <View style={{ height: RFValue(80), backgroundColor: '#fff', marginBottom: RFValue(10) }} />}
      />
    </View>
  );
};

export default Voting;
