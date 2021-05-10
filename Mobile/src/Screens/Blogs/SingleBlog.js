import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentsLikeButtons } from '../../Components';
import { CONSTANTS } from '../../Utils';

const SingleBlog = ({
  imageUrl,
  caption,
  marginBottom = 60,
  dateCreated,
  description,
  comments,
  likes,
  title,
  owner,
  _id,
  navigation: { navigate },
  last = false,
  children,
  ...rest
}) => {
  // console.log('LIKES::', rest);

  const payload = {
    imageUrl,
    caption,
    dateCreated,
    description,
    comments,
    likes,
    title,
    owner,
    _id
  };

  console.log('Lkes', likes.length);
  // const test = `sdfsdfsd {'\n'} new line created `;
  return (
    <View style={{ marginBottom: last ? RFValue(marginBottom) : RFValue(15), backgroundColor: '#fff' }}>
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
      <Pressable style={{ width: '100%', padding: RFValue(10) }} onPress={() => navigate('BlogProfile', payload)}>
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
        <Pressable onPress={() => navigate('BlogProfile', payload)}>
          <ImageBackground
            source={{ uri: imageUrl }}
            style={{ height: RFValue(250), width: '100%', backgroundColor: '#000' }}
            resizeMode="cover"
          >
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                padding: RFValue(10),
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              {/* <Text style={{ fontSize: RFValue(30), color: '#fff', fontWeight: '700' }}>{price} /=</Text> */}
              <View />
            </View>
          </ImageBackground>
        </Pressable>
      ) : null}
      <CommentsLikeButtons comments={comments} likes={likes} type="blog" id={_id} />
    </View>
  );
};

export default SingleBlog;
