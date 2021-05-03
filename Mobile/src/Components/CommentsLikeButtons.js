import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../Utils';

const CommentsLikeButtons = ({ comments, likes: _likes, type, blogId, id }) => {
  console.log('ID--', id);
  const [ likes, setLikes ] = React.useState(_likes);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Blogs);
  const likeHandler = () => {
    switch (type) {
      case 'event':
        return eventHandler();
      case 'blog':
        return blogHandler();
    }
  };

  const userPayload = { email: user.email, uid: user.uid, name: user.name, imageUrl: user.imageUrl };

  const eventHandler = () => {};

  const blogHandler = () => {
    dispatch.Blogs.likeBlog({
      blogId,
      payload: { owner: userPayload },
      callback: (res) => {
        console.log('REs from likgin  blog');
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        return setLikes([ ...likes, userPayload ]);
      }
    });
  };

  const liked = likes && likes.find((like) => like.owner.uid === user.uid);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        // borderWidth: 1,
        paddingHorizontal: RFValue(10),
        marginVertical: RFValue(10)
      }}
    >
      {/* <View style={{ flexDirection: 'column', width: '50%' }}>
      </View> */}
      <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>
        {likes && likes.length} likes ・ {comments && comments.length} comments
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}>
        {/* <Icon name="chatbubble-outline" size={RFValue(25)} color="#000" onPress={() => alert('Here')} /> */}
        <Icon
          name={liked ? 'heart' : 'heart-outline'}
          style={{ marginHorizontal: RFValue(10) }}
          size={RFValue(25)}
          color={loading.likeBlog ? '#aaaaaa70' : '#000'}
          onPress={() => (liked || loading.likeBlog ? null : likeHandler())}
          // onPress={() => alert(liked ? 'yes' : 'no')}
        />
        <Icon name="share" size={RFValue(25)} color="#000" onPress={() => null} />
      </View>
    </View>
  );
};

export default CommentsLikeButtons;
