import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SingleBlog = ({
  imageUrl,
  caption,
  dateCreated,
  going,
  venue,
  comments,
  likes,
  title,
  navigation: { navigate },
  children,
  ...rest
}) => {
  console.log('LIKES::', rest);

  const test = `sdfsdfsd {'\n'} new line created `;
  return (
    <View style={{ marginBottom: RFValue(15) }}>
      <Pressable onPress={() => navigate('BlogProfile', {})}>
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
            {/* <Text style={{ fontSize: RFValue(30), color: '#fff', fontWeight: '700' }}>{price} /=</Text> */}
            <View />
          </View>
        </ImageBackground>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          // borderWidth: 1,
          paddingHorizontal: RFValue(10),
          marginVertical: RFValue(10)
        }}
      >
        <View style={{ flexDirection: 'column', width: '50%' }}>
          <Text style={{ fontSize: RFValue(18) }}>
            {title && title.trim().slice(0, 18)}
            {caption && caption.length > 18 && '...'}
          </Text>
          <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>
            {likes && likes.length} likes ・ {comments && comments.length} comments
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}>
          <Icon name="chatbubble-outline" size={RFValue(25)} color="#000" onPress={() => alert('Here')} />
          <Icon
            name="heart-outline"
            style={{ marginHorizontal: RFValue(10) }}
            size={RFValue(25)}
            color="#000"
            onPress={() => alert('comment')}
          />
          <MaterialCommunityIcons name="share" size={RFValue(25)} color="#000" onPress={() => alert('Share')} />
        </View>
      </View>
      {/* {children} */}
    </View>
  );
};

export default SingleBlog;
