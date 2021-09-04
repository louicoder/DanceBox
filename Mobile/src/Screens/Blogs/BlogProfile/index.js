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
  Alert,
  Keyboard
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComingSoon, CommentsLikeButtons, DesignIcon, SingleComment } from '../../../Components';
import Modal from '../../../Components/Modal';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../../Components/LoadingModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Comments from './Comments';
import CommentBox from './CommentBox';
import { DEFAULT_PROFILE } from '../../../Utils/Constants';

const BlogProfile = ({ navigation, route, ...props }) => {
  // const [ state, setState ] = React.useState({ ...route.params, comment: '' });
  const [ modal, setModal ] = React.useState(false);
  const dispatch = useDispatch();
  const [ blog, setBlog ] = React.useState({});
  const loading = useSelector((state) => state.loading.effects.Blogs);
  // const { user } = useSelector((state) => state.Account);
  const [ state, setState ] = React.useState({ comments: [], commentShowing: false });
  const [ user, setUser ] = React.useState({});
  // const { activeBlog } = useSelector((state) => state.Blogs);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {});
      getBlog();
      getComments();
      // console.log('Route', route.params);

      // return () => sub;
    },
    [ navigation ]
  );

  React.useEffect(() => {
    HelperFunctions.getUser(({ success, result }) => success && setUser(result));
  }, []);

  const getComments = () =>
    dispatch.Blogs.getBlogComments({
      blogId: route.params._id,
      callback: ({ result, success }) => {
        // console.log('Comments BLog-----', result);
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        setState({ ...state, comments: result });
      }
    });

  const getBlog = () =>
    dispatch.Blogs.getBlog({
      blogId: route.params._id,
      callback: (resp) => {
        // console.log('BLog', resp.result);
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

  const postComment = (comment) => {
    // posting comment
    Keyboard.dismiss();
    const { email, name, imageUrl, uid } = user;
    const owner = { email, name, imageUrl, uid };
    dispatch.Blogs.createBlogComment({
      blogId: route.params._id,
      payload: { comment, authorId: user._id, type: 'blog', id: route.params._id },
      callback: ({ success, result }) => {
        if (!success) return HelperFunctions.Notify('Error', result);
        let comments = [ ...state.comments ];
        comments.unshift(result);
        setState({ ...state, comments, commentShowing: false });
      }
    });
  };

  // console.log('ACtive blog', activeBlog);

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

  return (
    <View style={{ flex: 1 }}>
      {state.commentShowing && (
        <CommentBox close={() => setState({ ...state, commentShowing: false })} postComment={postComment} user={user} />
      )}
      {/* <KeyboardAwareScrollView
        extraScrollHeight={useSafeAreaInsets().top}
        style={{ flex: 1, backgroundColor: '#eeeeee70' }}
      > */}
      <LoadingModal isVisible={loading.getBlog || loading.likeBlog} />
      {blog && (
        <View style={{ flex: 1 }}>
          <View style={{ flexGrow: 1, borderWidth: 0 }}>
            <FlatList
              style={{ flex: 1, backgroundColor: '#eeeeee70', marginTop: RFValue(10) }}
              ListHeaderComponent={() => (
                <View>
                  <Blog {...blog} />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: RFValue(10),
                      paddingVertical: RFValue(15)
                    }}
                  >
                    <Image
                      source={{ uri: user.imageUrl || DEFAULT_PROFILE }}
                      style={{ width: RFValue(30), height: RFValue(30), borderRadius: 50, marginRight: RFValue(20) }}
                    />
                    <Pressable
                      onPress={() => setState({ ...state, commentShowing: true })}
                      style={{
                        backgroundColor: '#eee',
                        flexGrow: 1,
                        flexDirection: 'row',
                        height: RFValue(40),
                        paddingHorizontal: RFValue(10),
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>Leave your comment...</Text>
                      {state.commentShowing && <DesignIcon name="close" color="#aaa" />}
                    </Pressable>
                  </View>
                </View>
              )}
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
            {/* {state.comments && !state.comments.length ? (
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
            ) : null} */}
          </View>
        </View>
      )}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default BlogProfile;
