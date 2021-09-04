import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../Utils';
import DesignIcon from './DesignIcon';

const CommentsLikeButtons = ({ comments, likes, type, id, extStyles, likeHandler }) => {
  // console.log('ID--', id);
  const [ likesx, setLikes ] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Account);
  // const { blogs } = useSelector((state) => state.Blogs);
  // const { events } = useSelector((state) => state.Events);
  const loading = useSelector((state) => state.loading.effects.Blogs);

  // const likeHandler = () => {
  //   switch (type) {
  //     case 'event':
  //       console.log('called here...');
  //       return eventHandler();
  //     case 'blog':
  //       return blogHandler();
  //   }
  // };

  // const payload = { email: user.email, uid: user.uid, name: user.name, imageUrl: user.imageUrl };

  // const eventHandler = () => {
  //   // console.log('Calling event');
  //   dispatch.Events.likeEvent({
  //     eventId: id,
  //     callback: (res) => {
  //       // console.log('REs from likgin  event', res);
  //       if (!res.success) return HelperFunctions.Notify('Error', res.result);
  //       // setLikes([ ..._likes, userPayload ]);
  //     }
  //   });
  // };

  // const blogHandler = () => {
  //   dispatch.Blogs.likeBlog({
  //     blogId: id,
  //     payload,
  //     callback: (res) => {
  //       // console.log('REs from likgin  blog', res);
  //       if (!res.success) return HelperFunctions.Notify('Error', res.result);
  //       // setLikes([ ..._likes, userPayload ]);
  //     }
  //   });
  // };

  // const liked = () => {
  //   if (type === 'blog') {
  //     const blogLikes = blogs.find((blog) => blog._id === id);
  //     // console.log('BLOGLIKES', blogLikes);
  //     return blogLikes.likes.findIndex((bl) => bl.uid === user.uid) !== -1;
  //   } else {
  //     const eventLikes = events && events.find((event) => event._id === id);
  //     return eventLikes.likes.findIndex((el) => el.uid === user.uid) !== -1;
  //   }
  // };

  const liked = likes && likes.includes(user && user.uid);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: RFValue(20),
        paddingHorizontal: RFValue(0)
      }}
    >
      <Text style={{ alignSelf: 'flex-end', fontSize: RFValue(16), color: '#aaa' }}>
        {likes && likes.length} likes ・ {comments && comments.length} comments
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
        <DesignIcon name={liked ? 'heart' : 'hearto'} pkg="ad" onPress={() => null} />
        <DesignIcon name="share-a" pkg="fot" extStyles={{ marginHorizontal: RFValue(10) }} onPress={() => null} />
        {/* <DesignIcon name="download" pkg="ft" onPress={() => null} /> */}
      </View>
    </View>
  );
};

export default CommentsLikeButtons;
