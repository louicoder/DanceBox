import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet, ComingSoon, CommentsLikeButtons, DesignIcon, Comments, Typo } from '../../../Components';
import Modal from '../../../Components/Modal';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../../Components/LoadingModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Comments from './Comments';
import CommentBox from './CommentBox';
import { DEFAULT_PROFILE, THEME_COLOR, WHITE } from '../../../Utils/Constants';
import { useKeyboard } from '../../../Utils/useKeyboardHeight';
import SingleBlog from '../SingleBlog';

const { height } = Dimensions.get('window');
const BlogProfile = ({ navigation, route, ...props }) => {
  const dispatch = useDispatch();
  const [ blog, setBlog ] = React.useState({});
  // const loading = useSelector((state) => state.loading.effects.Blogs);
  const loading = useSelector((state) => state.loading.effects);
  const { user } = useSelector((state) => state.Account);
  const { comments } = useSelector((state) => state.General);
  const [ comment, setComment ] = React.useState('');
  // const [ user, setUser ] = React.useState({});
  const { activeBlog } = useSelector((state) => state.Blogs);
  const [ KeyHeight ] = useKeyboard();

  React.useEffect(
    () => {
      // console.log('EVENT PROFILE', route.params);
      const sub = navigation.addListener('focus', () => {
        getPostComments();
      });

      return () => {
        navigation.removeListener(sub);
      };
    },
    [ navigation ]
  );

  const getPostComments = () => {
    dispatch.General.setField('comments', []);
    dispatch.General.setField('commentsPagination', {
      nextPage: 1,
      limit: 10,
      totalDocuments: 0,
      last: false,
      totalPages: 1
    });

    dispatch.General.getPostComments({
      postId: route.params._id,
      callback: ({ result, success }) => {
        // console.log('Comments', result);
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        // setState({ ...state, comments: result });
      }
    });
  };

  // React.useEffect(
  //   () => {
  //     const sub = navigation.addListener('focus', () =>
  //       HelperFunctions.getUser(({ success, result }) => success && setUser(result))
  //     );
  //     console.log('USER', user);
  //     return () => sub;
  //   },
  //   [ navigation ]
  // );

  const getComments = () =>
    dispatch.Blogs.getBlogComments({
      blogId: route.params._id,
      callback: ({ result, success }) => {
        if (!success) return HelperFunctions.Notify('Erro getting comments', result);
        // setState({ ...state, comments: result });
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

  const postComment = () => {
    Keyboard.dismiss();
    // console.log('Raeched posting comment', comment);
    if (!comment) return showAlert('Empty comment', 'Please add a comment in order to continue commenting.', 'danger');
    const payload = { comment, authorId: user.uid, postId: route.params._id };
    dispatch.General.postComment({
      // eventId: user,
      payload,
      callback: ({ result, success }) => {
        if (!success) return showAlert('Failed!', result);
        setComment('');
        // let comments = [ ...state.comments ];
        // comments.unshift(result);
        // setState({ ...state, comments, commentShowing: false });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <BottomSheet isVisible={state.isVisible} closeModal={closeModal}>
          <View style={{ height, paddingTop: useSafeAreaInsets().top }}>
            <Text>This is the best show coming through</Text>
          </View>
        </BottomSheet> */}
      <ScrollView style={{ flex: 1 }}>
        <SingleBlog
          blog={activeBlog}
          {...activeBlog}
          index={0}
          // last
          first={false}
          header={false}
          style={{ paddingVertical: 0 }}
          allWords
        />
        <Comments postId={route.params && route.params._id} navigation={navigation} style={{ marginTop: 0 }} />

        {/* </KeyboardAwareScrollView> */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#ddd',
          paddingHorizontal: RFValue(10)
        }}
      >
        <TextInput
          placeholder="Enter your comment here..."
          multiline
          style={{ maxHeight: RFValue(100), width: '75%', marginRight: RFValue(10), fontSize: RFValue(14) }}
          value={comment}
          onChangeText={(e) => setComment(e)}
        />
        {loading.General.postComment || loading.General.getPostComments ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Typo
            text="Post"
            onPress={postComment}
            style={{
              backgroundColor: THEME_COLOR,
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(5),
              borderRadius: RFValue(50)
            }}
            pressable
            color={WHITE}
          />
        )}
      </View>
    </View>
  );
};

export default BlogProfile;
