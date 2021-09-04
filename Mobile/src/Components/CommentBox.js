import React from 'react';
import { View, Text, Image, TextInput, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS, HelperFunctions } from '../Utils';
import DesignIcon from './DesignIcon';

const CommentBox = ({ postComment, loading = false }) => {
  const [ User, setUser ] = React.useState({ user: {}, comment: {} });
  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    //
    HelperFunctions.getAsyncObjectData('user', (res) => {
      // console.log('User comment box', res);
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        // marginBottom: RFValue(15),
        padding: RFValue(10),
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        alignItems: 'flex-start'
      }}
    >
      <View style={{ width: '10%' }}>
        <Image
          source={{ uri: CONSTANTS.DEFAULT_PROFILE }}
          style={{
            marginRight: RFValue(20),
            width: RFValue(30),
            height: RFValue(30),
            borderRadius: RFValue(30),
            marginTop: RFValue(5)
          }}
        />
      </View>

      <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <TextInput
          style={{
            fontSize: RFValue(16),
            backgroundColor: '#eee',
            paddingHorizontal: RFValue(10),
            width: '75%',
            // paddingTop: RFValue(10),
            // minHeight: RFValue(200),
            maxHeight: RFValue(200)
          }}
          placeholder="Enter your comment..."
          textAlignVertical="top"
          multiline
          // maxLength={300}
        />
        <Pressable
          // onPress={() => postComment(comment)}
          style={{
            // borderWidth: 1,
            width: '15%',
            paddingLeft: RFValue(10),
            marginTop: RFValue(5),
            // backgroundColor: '#010203',
            // padding: RFValue(10),
            // alignSelf: 'flex-end'
            justifyContent: 'flex-start',
            alignItems: 'center'
            // marginTop: RFValue(10)
          }}
        >
          {/* <Text style={{ color: 'blue', fontSize: RFValue(16) }}>Post</Text> */}
          <DesignIcon
            size={RFValue(24)}
            name="send"
            pkg="ft"
            extStyles={{ transform: [ { rotate: '40deg' } ] }}
            color="#000000"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CommentBox;
