import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CONSTANTS } from '../../Utils';

const SingleEvent = ({
  imageUrl,
  price,
  title,
  attending,
  venue,
  startDate,
  endDate,
  comments,
  dateCreated,
  description,
  judgingCriteria,
  participating,
  judgingNotes,
  noOfJudges,
  free,
  owner,
  location,
  amount,
  likes,
  _id,
  navigation: { navigate },
  children,
  ...rest
}) => {
  // console.log('EVent owner');

  const payload = {
    imageUrl,
    price,
    title,
    attending,
    venue,
    startDate,
    endDate,
    comments,
    dateCreated,
    judgingCriteria,
    description,
    participating,
    judgingNotes,
    noOfJudges,
    free,
    owner,
    location,
    amount,
    likes,
    eventId: _id,
    _id
  };

  return (
    <View style={{ marginBottom: RFValue(15), backgroundColor: '#fff' }}>
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
          source={{ uri: owner.imageUrl || CONSTANTS.DEFAULT_PROFILE }}
          style={{ height: RFValue(40), width: RFValue(40), borderRadius: RFValue(50) }}
        />
        <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ paddingLeft: RFValue(10) }}>
            <Text style={{ fontSize: RFValue(14) }}>{owner.name || owner.email}</Text>
            <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>{moment(dateCreated).fromNow()}</Text>
          </View>
          <MaterialCommunityIcons name="dots-vertical" size={RFValue(20)} style={{}} />
        </View>
      </View>

      <Pressable style={{ width: '100%', padding: RFValue(10) }} onPress={() => navigate('EventProfile', payload)}>
        <Text style={{ fontSize: RFValue(18) }}>
          {title && title.trim().slice(0, 18)}
          {title && title.length > 18 && '...'}
        </Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
          {description && description.trim().slice(0, 200)}
          {description && description.length > 300 && '...'}
        </Text>
      </Pressable>

      {imageUrl ? (
        <Pressable onPress={() => navigate('EventProfile', payload)}>
          <Image style={{ width: '100%', height: RFValue(300) }} resizeMode="cover" source={{ uri: imageUrl }} />
        </Pressable>
      ) : null}

      <View style={{ padding: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(14), fontWeight: '600' }}>
          {moment(startDate).format('DD/MMMM/YYYY')} - {moment(endDate).format('DD/MMMM/YYYY')}
        </Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(3) }}>
          {participating && participating.length} participants ・
          <Text style={{}}>{attending && attending.length} attending</Text>
        </Text>
        <Text style={{ color: '#aaa' }}>
          {likes && likes.length} likes ・ {comments && comments.length} comments
        </Text>
      </View>
      {children}
    </View>
  );
};

export default SingleEvent;
