import React from 'react';
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import LoadingModal from '../../Components/LoadingModal';
import { HelperFunctions } from '../../Utils';

const { height } = Dimensions.get('window');

const NewBlogComment = ({ navigation, route: { params: { blogId, blog } } }) => {
  const [ comment, setComment ] = React.useState('');
  const { user } = useSelector((state) => state.Account);
  const { blogs } = useSelector((state) => state.Blogs);
  const loading = useSelector((state) => state.loading.effects.Blogs);
  const dispatch = useDispatch();

  const postComment = () => {
    // posting comment
    Keyboard.dismiss();
    const { email, name, imageUrl, uid } = user;
    const owner = { email, name, imageUrl, uid };
    dispatch.Blogs.createBlogComment({
      blogId,
      payload: { comment, owner },
      callback: (res) => {
        const blog = blogs.find((blog) => blog._id === blogId);
        // console.log('REsp from adding comment==', blog);
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        return navigation.navigate('BlogProfile', { ...blog, comments: [ ...blog.comments, { owner, comment } ] });
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal isVisible={loading.createBlogComment} />
      <KeyboardAwareScrollView style={{ flex: 1, padding: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(14) }}>Add your comment below</Text>
        <TextInput
          textAlignVertical="top"
          placeholder="Enter your comment here..."
          placeholderTextColor="#aaa"
          scrollEnabled={false}
          value={comment}
          multiline
          style={{
            backgroundColor: '#eee',
            // flexGrow: 1,
            marginVertical: RFValue(20),
            // height: RFValue(2 / 3 * height),
            height: RFValue(1 / 3 * height),
            fontSize: RFValue(14),
            padding: RFValue(10)
            // height: RFValue(200)
          }}
          onChangeText={(comment) => setComment(comment)}
        />

        <Pressable
          onPress={postComment}
          style={{ height: RFValue(40), backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: RFValue(14) }}>Create comment</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewBlogComment;
