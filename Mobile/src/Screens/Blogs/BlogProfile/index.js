import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComingSoon, CommentsLikeButtons, SingleComment } from '../../../Components';
import Modal from '../../../Components/Modal';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../../Components/LoadingModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Comments from './Comments';

const BlogProfile = ({ navigation, route, ...props }) => {
  const [ state, setState ] = React.useState({ ...route.params, comment: '' });
  const [ modal, setModal ] = React.useState(false);
  const dispatch = useDispatch();
  const [ blog, setBlog ] = React.useState({});
  const loading = useSelector((state) => state.loading.effects.Blogs);
  const { user } = useSelector((state) => state.Account);
  const { activeBlog } = useSelector((state) => state.Blogs);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        getBlog();
        getComments();
      });

      return () => sub;
    },
    [ navigation ]
  );

  const getComments = () => {
    // get comments for blog:
  };

  const getBlog = () =>
    dispatch.Blogs.getBlog({
      blogId: route.params._id,
      callback: (resp) => {
        console.log('BLog', resp.result);
        setBlog({ ...resp.result });
      }
    });

  const likeHandler = () => {
    const uid = user.uid || auth().currentUser.uid;
    dispatch.Blogs.likeBlog({
      blogId: route.params._id,
      callback: (res) => {
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        setBlog({ ...blog, likes: [ ...blog.likes, uid ] });
      }
    });
  };

  // const postComment = () => {
  //   // posting comment
  //   Keyboard.dismiss();
  //   const { email, name, imageUrl, uid } = user;
  //   const owner = { email, name, imageUrl, uid };
  //   dispatch.Blogs.createBlogComment({
  //     blogId,
  //     payload: { comment, owner },
  //     callback: (res) => {
  //       const blog = blogs.find((blog) => blog._id === blogId);
  //       // console.log('REsp from adding comment==', blog);
  //       if (!res.success) return HelperFunctions.Notify('Error', res.result);
  //       return navigation.navigate('BlogProfile', { ...blog, comments: [ ...blog.comments, { owner, comment } ] });
  //     }
  //   });
  // };

  console.log('ACtive blog', activeBlog);

  const Blog = ({ imageUrl, title, description, comments, likes, _id, ...rest }) => {
    // console.log('Title', title);
    return (
      <View style={{ backgroundColor: '#fff', marginBottom: RFValue(15) }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: '100%', height: RFValue(350) }} resizeMode="cover" />
        ) : null}

        <View style={{ margin: RFValue(10) }}>
          <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>{description}</Text>
          <CommentsLikeButtons
            likes={likes}
            comments={comments}
            id={_id}
            type="blog"
            blogId={_id}
            likeHandler={likeHandler}
          />
        </View>
      </View>
    );
  };

  // console.log('ImageURL', blog.imageUrl);
  return (
    <KeyboardAwareScrollView
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? RFValue(90) : 0}
      extraScrollHeight={useSafeAreaInsets().top}
      style={{ flex: 1, backgroundColor: '#eee' }}
    >
      <LoadingModal isVisible={loading.getBlog || loading.likeBlog} />
      {blog && (
        <View style={{ flex: 1 }}>
          <Blog {...blog} />
          <Comments comments={blog.comments} navigation={navigation} />
          {/* <View style={{ flexGrow: 1 }}>
            {state.comments && state.comments.length ? (
              <FlatList
                style={{ flex: 1, backgroundColor: '#aaaaaa80' }}
                ListHeaderComponent={<Blog {...blog} />}
                // ListFooterComponent={}
                data={state.comments}
                keyExtractor={() => HelperFunctions.keyGenerator()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <SingleComment
                    {...item}
                    last={index + 1 === state.comments.length}
                    navigation={navigation}
                    _id={state._id}
                    blog={item}
                  />
                )}
              />
            ) : null}
            {state.comments && !state.comments.length ? (
              <ComingSoon title="" extStyles={{ flexGrow: 1 }}>
                <Pressable
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => navigation.navigate('NewBlogComment', { blogId: state._id })}
                >
                  <Icon name="message-text-outline" size={RFValue(30)} style={{ marginVertical: RFValue(20) }} />
                  <Text style={{ textAlign: 'center', color: '#aaa' }}>
                    No comments yet, touch here to be the first one to add a comment...
                  </Text>
                </Pressable>
              </ComingSoon>
            ) : null}
          </View> */}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default BlogProfile;
