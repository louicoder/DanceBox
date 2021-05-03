import React from 'react';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComingSoon, CommentsLikeButtons, SingleComment } from '../../../Components';
import Modal from '../../../Components/Modal';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const BlogProfile = ({ navigation, route, ...props }) => {
  const [ state, setState ] = React.useState({ ...route.params, comment: '' });
  const [ modal, setModal ] = React.useState(false);

  React.useEffect(
    () => {
      const sub = navigation.addListener('focus', () => {
        setState({ ...route.params });
      });
      return () => sub;
    },
    [ navigation, route.params ]
  );

  // console.log('CHECking commentns', props.comments);
  const Blog = ({ imageUrl, title, description, comments, likes, _id }) => (
    <View style={{ backgroundColor: '#fff', marginBottom: RFValue(15) }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: RFValue(350) }} resizeMode="cover" />
      ) : null}

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
      <View style={{ flex: 1 }}>
        <View style={{ flexGrow: 1 }}>
          {state.comments && state.comments.length ? (
            <FlatList
              style={{ flex: 1, backgroundColor: '#aaaaaa80' }}
              ListHeaderComponent={<Blog {...state} />}
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BlogProfile;
