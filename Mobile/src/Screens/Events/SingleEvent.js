import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CONSTANTS } from '../../Utils';

const SingleEvent = ({
  user,
  likes,
  _id,
  imageUrl,
  title,
  price,
  attending,
  participating,
  description,
  dateCreated,
  navigation: { navigate },
  last,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: !last ? RFValue(15) : 0, backgroundColor: '#fff' }}>
      {user && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // height: RFValue(50),
            padding: RFValue(10),

            width: '100%'
          }}
        >
          <Image
            source={{ uri: user.imageUrl || CONSTANTS.DEFAULT_PROFILE }}
            style={{ height: RFValue(40), width: RFValue(40), borderRadius: RFValue(50) }}
          />
          <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ paddingLeft: RFValue(10) }}>
              <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{`${user.companyName}`}</Text>
              <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>{moment(dateCreated).fromNow()}</Text>
            </View>
            {/* <MaterialCommunityIcons name="dots-vertical" size={RFValue(20)} style={{}} /> */}
          </View>
        </View>
      )}

      {title && (
        <Pressable style={{ width: '100%', padding: RFValue(10) }} onPress={() => navigate('EventProfile', { _id })}>
          {title && (
            <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>
              {title.trim().slice(0, 50)}
              {title.length > 50 && '...'}
            </Text>
          )}
          {/* <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
            {description && description.trim().slice(0, 200)}
            {description && description.length > 300 && '...'}
          </Text> */}
        </Pressable>
      )}

      {imageUrl ? (
        <Pressable onPress={() => navigate('EventProfile', { _id })}>
          <Image style={{ width: '100%', height: RFValue(300) }} resizeMode="cover" source={{ uri: imageUrl }} />
        </Pressable>
      ) : null}
      {description && (
        <View style={{ paddingHorizontal: RFValue(10) }}>
          {/* <Text style={{ fontSize: RFValue(14), fontWeight: '600' }}>
          {moment(startDate).format('DD/MMMM/YYYY')} - {moment(endDate).format('DD/MMMM/YYYY')}
        </Text> */}
          <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(15) }}>
            {description && description.trim().slice(0, 200)}
            {description && description.length > 300 && '...'}
          </Text>

          <Text style={{ fontSize: RFValue(16), marginBottom: RFValue(15), color: '#aaa' }}>
            {participating && participating.length} participants ・
            {attending && attending.length} going
          </Text>

          {/* <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>
          {likes && likes.length} likes ・ {comments && comments.length} comments
        </Text> */}
        </View>
      )}

      {/* {children} */}
    </View>
  );
};

export default SingleEvent;
