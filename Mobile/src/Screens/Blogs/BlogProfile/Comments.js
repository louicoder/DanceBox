import React from 'react';
import { View, Text, Pressable, TextInput, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SingleComment } from '../../../Components';
import { CONSTANTS } from '../../../Utils';

const Comments = ({ user, comments, navigation }) => {
  return (
    <View
      style={{
        paddingVertical: RFValue(10),
        backgroundColor: '#fff'
      }}
    >
      <Text
        style={{ marginVertical: RFValue(10), fontSize: RFValue(14), color: '#aaa', marginHorizontal: RFValue(10) }}
      >
        Join the conversation below
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: RFValue(15),
          width: '100%',
          marginTop: RFValue(10),
          paddingHorizontal: RFValue(10)
        }}
      >
        <View style={{ width: '10%' }}>
          <Image
            source={{ uri: (user && user.imageUrl) || CONSTANTS.DEFAULT_PROFILE }}
            style={{ marginRight: RFValue(10), width: RFValue(30), height: RFValue(30), borderRadius: RFValue(30) }}
          />
        </View>
        <View style={{ flexGrow: 1, paddingLeft: RFValue(10), width: '90%' }}>
          <TextInput
            style={{
              fontSize: RFValue(12),
              backgroundColor: '#eee',
              padding: RFValue(10),
              paddingTop: RFValue(10),
              minHeight: RFValue(200),
              maxHeight: RFValue(200)
            }}
            placeholder="Enter your comment..."
            textAlignVertical="top"
            multiline
            maxLength={300}
          />
          <Pressable
            onPress={() => postComment(comment)}
            style={{
              backgroundColor: '#010203',
              padding: RFValue(10),
              alignSelf: 'flex-end',
              marginTop: RFValue(10)
            }}
          >
            <Text style={{ color: '#fff' }}>comment</Text>
          </Pressable>
        </View>
      </View>

      {comments &&
        comments.map((item, index) => (
          <SingleComment
            first={index === 0}
            {...item}
            navigation={navigation}
            last={index + 1 === (comments && comments.length)}
            // goto={() => navigation.navigate('NewEventComment', { eventId: event._id })}
          />
        ))}
    </View>
  );
};

export default Comments;
