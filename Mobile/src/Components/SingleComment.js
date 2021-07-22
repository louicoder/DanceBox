import moment from 'moment';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../Utils';

const SingleComment = ({
  imageUrl,
  comment,
  dateCreated,
  goto,
  owner,
  last,
  navigation: { navigate },
  _id,
  blog,
  ...rest
}) => {
  // console.log('OWNER', rest);

  return (
    <View style={{ paddingVertical: RFValue(0) }}>
      <View
        style={{
          width: '100%',
          paddingVertical: RFValue(15),
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
          backgroundColor: '#fff'
        }}
        // key={() => HelperFunctions.keyGenerator()}
      >
        <View style={{ width: '15%' }}>
          <Image
            source={{
              uri: imageUrl || CONSTANTS.DEFAULT_PROFILE
            }}
            style={{ width: RFValue(30), height: RFValue(30), borderRadius: RFValue(100) }}
          />
        </View>
        <View style={{ width: '80%' }}>
          {owner && <Text style={{}}>{owner.name || owner.email}</Text>}
          <Text style={{ color: '#aaaaaa', fontSize: RFValue(12) }}>{moment(dateCreated).fromNow()}</Text>
          <Text style={{ paddingVertical: RFValue(6), color: '#000000' }}>{comment}</Text>
        </View>
      </View>
      {last && (
        <View style={{ width: '100%', backgroundColor: '#fff' }}>
          <Pressable
            onPress={() => (goto ? goto() : navigate('NewBlogComment', { blogId: _id, blog }))}
            style={{
              width: '95%',
              backgroundColor: '#000',
              height: RFValue(40),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: RFValue(15)
            }}
          >
            <Text style={{ fontSize: RFValue(14), color: '#fff' }}>+ Add a comment</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SingleComment;
