import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SingleEvent = ({
  imageUrl,
  price,
  title,
  attending,
  venue,
  comments,
  location,
  amount,
  likes,
  navigation: { navigate },
  children,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: RFValue(15) }}>
      <Pressable
        onPress={() => navigate('EventProfile', { imageUrl, price, title, attending, venue, comments, likes, ...rest })}
      >
        <ImageBackground
          source={{ uri: imageUrl || 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg' }}
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
            <Text style={{ fontSize: RFValue(30), color: '#fff', fontWeight: '700' }}>
              {price === 'free' ? 'FREE' : amount} {price === 'paid' && '/='}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="chatbubble-outline" size={RFValue(25)} color="#fff" onPress={() => alert('Here')} />
              <Icon
                name="heart-outline"
                style={{ marginHorizontal: RFValue(10) }}
                size={RFValue(25)}
                color="#fff"
                onPress={() => alert('comment')}
              />
              <MaterialCommunityIcons name="share" size={RFValue(25)} color="#fff" onPress={() => alert('Share')} />
            </View>
          </View>
        </ImageBackground>
      </Pressable>
      <View style={{ padding: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(20), fontWeight: '600' }}>{title}</Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(3) }}>
          {location && location.slice(0, 20)}・
          <Text style={{}}>{attending && attending.length} people going</Text>
        </Text>
        <Text style={{ color: '#aaa' }}>
          {likes && likes.length} likes ・ {comments} comments
        </Text>
      </View>
      {children}
    </View>
  );
};

export default SingleEvent;
