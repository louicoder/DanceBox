import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../Utils';

const CommentsLikeButtons = ({ comments, likes, type, id, extStyles }) => {
  // console.log('ID--', id);
  const [ likesx, setLikes ] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  const { blogs } = useSelector((state) => state.Blogs);
  const { events } = useSelector((state) => state.Events);
  const loading = useSelector((state) => state.loading.effects.Blogs);

  const likeHandler = () => {
    switch (type) {
      case 'event':
        console.log('called here...');
        return eventHandler();
      case 'blog':
        return blogHandler();
    }
  };

  const payload = { email: user.email, uid: user.uid, name: user.name, imageUrl: user.imageUrl };

  const eventHandler = () => {
    // console.log('Calling event');
    dispatch.Events.likeEvent({
      eventId: id,
      payload,
      callback: (res) => {
        // console.log('REs from likgin  event', res);
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        // setLikes([ ..._likes, userPayload ]);
      }
    });
  };

  const blogHandler = () => {
    dispatch.Blogs.likeBlog({
      blogId: id,
      payload,
      callback: (res) => {
        // console.log('REs from likgin  blog', res);
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        // setLikes([ ..._likes, userPayload ]);
      }
    });
  };

  const liked = () => {
    if (type === 'blog') {
      const blogLikes = blogs.find((blog) => blog._id === id);
      // console.log('BLOGLIKES', blogLikes);
      return blogLikes.likes.findIndex((bl) => bl.uid === user.uid) !== -1;
    } else {
      const eventLikes = events.find((event) => event._id === id);
      return eventLikes.likes.findIndex((el) => el.uid === user.uid) !== -1;
    }
  };

  // console.log('LikedXXXX', liked());
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          // borderWidth: 1,
          paddingHorizontal: RFValue(10),
          marginVertical: RFValue(10)
        },
        extStyles
      ]}
    >
      <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>
        {likes && likes.length} likes ・ {comments && comments.length} comments
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', justifyContent: 'flex-end' }}>
        <Icon
          name={liked() ? 'heart' : 'heart-outline'}
          style={{ marginHorizontal: RFValue(10) }}
          size={RFValue(30)}
          color={loading.likeBlog ? '#aaaaaa70' : '#000'}
          onPress={() => (liked() || loading.likeBlog ? null : likeHandler())}
          // onPress={() => alert(liked ? 'yes' : 'no')}
        />
        <Icon name="share" size={RFValue(30)} color="#000" onPress={() => null} />
      </View>
    </View>
  );
};

export default CommentsLikeButtons;
