import React from 'react';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComingSoon, CommentsLikeButtons, SingleComment } from '../../../Components';
import Modal from '../../../Components/Modal';
import { HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const BlogProfile = ({ navigation, route, ...props }) => {
  const [ state, setState ] = React.useState({ ...route.params, comment: '' });
  const [ modal, setModal ] = React.useState(false);

  console.log('CHECking commentns', props.comments);
  const Blog = ({ imageUrl, title, description, comments, likes, _id }) => (
    <View>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: RFValue(350) }} resizeMode="cover" />
      )}

      <CommentsLikeButtons likes={likes} comments={comments} id={_id} type="blog" blogId={_id} />

      <View style={{ margin: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>{description}</Text>
        <Text style={{ marginVertical: RFValue(10), fontSize: RFValue(14), color: '#aaa' }}>
          Join the conversation below
        </Text>
      </View>
    </View>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? RFValue(90) : 0}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Blog {...state} />
        <View style={{ flexGrow: 1 }}>
          {state.comments && state.comments.length ? (
            <FlatList
              style={{ flex: 1 }}
              // ListHeaderComponent={<Blog {...state} />}
              // ListFooterComponent={}
              data={state.comments}
              key={() => HelperFunctions.keyGenerator()}
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
          ) : (
            <ComingSoon title="" extStyles={{ height: RFValue(500) }}>
              <Pressable onPress={() => navigation.navigate('NewBlogComment')}>
                <Text>Touch to be the first to leave a comment</Text>
              </Pressable>
            </ComingSoon>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BlogProfile;
