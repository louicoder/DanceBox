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
  owner,
  last,
  navigation: { navigate },
  _id,
  blog,
  ...rest
}) => {
  // console.log('OWNER', rest);

  return (
    <View>
      <View
        style={{
          width: '100%',
          marginBottom: RFValue(20),
          flexDirection: 'row',
          paddingHorizontal: RFValue(10)
        }}
        // key={() => HelperFunctions.keyGenerator()}
      >
        <View style={{ width: '20%' }}>
          <Image
            source={{
              uri: imageUrl || CONSTANTS.DEFAULT_PROFILE
            }}
            style={{ width: RFValue(50), height: RFValue(50), borderRadius: RFValue(100) }}
          />
        </View>
        <View style={{ width: '80%' }}>
          {owner && <Text style={{ fontWeight: 'bold' }}>{owner.name || owner.email}</Text>}
          <Text style={{ color: '#aaaaaa80' }}>{moment(dateCreated).fromNow()}</Text>
          <Text style={{ paddingVertical: RFValue(5) }}>{comment}</Text>
        </View>
      </View>
      {last && (
        <Pressable
          onPress={() => navigate('NewBlogComment', { blogId: _id, blog })}
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
      )}
    </View>
  );
};

export default SingleComment;
