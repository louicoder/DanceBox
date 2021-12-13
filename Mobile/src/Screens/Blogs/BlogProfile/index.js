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
  Keyboard,
  Dimensions
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet, ComingSoon, CommentsLikeButtons, DesignIcon, SingleComment } from '../../../Components';
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
import { useKeyboard } from '../../../Utils/useKeyboardHeight';

const { height } = Dimensions.get('window');
const BlogProfile = ({ navigation, route, ...props }) => {
  const dispatch = useDispatch();
  const [ blog, setBlog ] = React.useState({});
  const loading = useSelector((state) => state.loading.effects.Blogs);
  // const { user } = useSelector((state) => state.Account);
  const [ state, setState ] = React.useState({ comments: [], commentShowing: false, isVisible: true });
  const [ user, setUser ] = React.useState({});
  // const { activeBlog } = useSelector((state) => state.Blogs);
  const [ KeyHeight ] = useKeyboard();

  React.useEffect(
    () => {
      // const sub = navigation.addListener('focus', () => {});
      getBlog();
      getComments();
    },
    [ navigation ]
  );

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () =>
        HelperFunctions.getUser(({ success, result }) => success && setUser(result))
      );
      console.log('USER', user);
      return () => sub;
    },
    [ navigation ]
  );

  const getComments = () =>
    dispatch.Blogs.getBlogComments({
      blogId: route.params._id,
      callback: ({ result, success }) => {
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        setState({ ...state, comments: result });
      }
    });

  const getBlog = () =>
    dispatch.Blogs.getBlog({
      blogId: route.params._id,
      callback: (resp) => {
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

  const openModal = React.useCallback(
    () => {
      setState({ ...state, isVisible: true });
    },
    [ setState ]
  );

  const closeModal = React.useCallback(
    () => {
      setState({ ...state, isVisible: false });
    },
    [ setState ]
  );

  return (
    <View style={{ flex: 1 }}>
      {state.commentShowing && (
        <CommentBox close={() => setState({ ...state, commentShowing: false })} postComment={postComment} user={user} />
      )}
      {/* <KeyboardAwareScrollView
        extraScrollHeight={useSafeAreaInsets().top}
        style={{ flex: 1, backgroundColor: '#eeeeee70' }}
      > */}
      {/* <LoadingModal isVisible={loading.getBlog || loading.likeBlog} /> */}
      <BottomSheet isVisible={state.isVisible} closeModal={closeModal}>
        <View style={{ height, paddingTop: useSafeAreaInsets().top }}>
          <Text>This is the best show coming through</Text>
        </View>
      </BottomSheet>
      {blog && (
        <View style={{ flex: 1 }}>
          <View style={{ flexGrow: 1, borderWidth: 0 }}>
            <FlatList
              style={{ flex: 1, backgroundColor: '#eeeeee70', marginTop: RFValue(10) }}
              ListHeaderComponent={() => (
                <View>
                  <Blog {...blog} comments={state.comments} />
                  {user && user._id ? (
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
                      {user && user.imageUrl ? (
                        <Image
                          source={{ uri: user && user.imageUrl }}
                          style={{
                            width: RFValue(30),
                            height: RFValue(30),
                            borderRadius: 50,
                            marginRight: RFValue(20)
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            width: RFValue(30),
                            height: RFValue(30),
                            borderRadius: 50,
                            backgroundColor: '#eee',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <DesignIcon name="user" pkg="ad" size={20} color="#aaa" />
                        </View>
                      )}
                      <Pressable
                        onPress={openModal}
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
                  ) : null}
                </View>
              )}
              // ListFooterComponent={}
              data={state.comments}
              keyExtractor={() => HelperFunctions.keyGenerator()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <SingleComment
                  // extStyles={{ paddingTop: index === 0 ? RFValue(15) : 0 }}
                  {...item}
                  last={index + 1 === state.comments.length}
                  first={index === 0}
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
