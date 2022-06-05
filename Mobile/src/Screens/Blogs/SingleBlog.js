import moment from 'moment';
import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentsLikeButtons, DesignIcon, LikeCommentShare, PostProfileCard, Typo } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { BROWN, GRAY, SHADOW, THEME_COLOR, WHITE, WIDTH } from '../../Utils/Constants';
// import Image from 'react-native-fast-image';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SingleBlog = ({ single, readMore = true, blog, header = true, style, allWords = false, ...props }) => {
  // console.log('POST::::', props);
  const [ shareLoading, setShareLoading ] = React.useState(false);
  const [ img, setImg ] = React.useState({ width: WIDTH, height: WIDTH });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const payload = {
  //   imageUrl,
  //   caption,
  //   dateCreated,
  //   description,
  //   comments,
  //   likes,
  //   title,
  //   owner,
  //   // user,
  //   _id
  // };

  // useEffect(() => {
  //   if (props.imageUrl && single)
  //     Image.getSize(props.imageUrl, (width, height) => {
  //       const obj = { width: WIDTH, height: height * (WIDTH / width) };
  //       setImg({ ...img, ...obj });
  //     });
  // }, []);

  // const shareBlog = () => {
  //   setShareLoading(true);
  //   HelperFunctions.getsharableBase64((res) => {
  //     setShareLoading(false);
  //     console.log('Shareable base64', res);
  //   });
  // };

  // const getImageStyles = (width, height) => {
  //   return { width: WIDTH, height: img.height * (WIDTH / img.width) };
  // };

  return (
    <View
      style={{
        marginBottom: RFValue(8),
        paddingVertical: RFValue(10),
        paddingBottom: props.last ? RFValue(70) : RFValue(8),
        backgroundColor: WHITE,
        ...style
      }}
    >
      {header ? <PostProfileCard {...props} {...props.user} /> : null}
      {props.imageUrl ? (
        <FastImage
          source={{ uri: props.imageUrl }}
          // onLoad={({ nativeEvent: { height, width } }) => {
          //   setImg({ ...img, width, height: height * (WIDTH / width) });
          // }}
          resizeMode="cover"
          // onLoadEnd={e =}
          // style={getImageStyles()}
          style={{ ...img, marginBottom: RFValue(15) }}
        />
      ) : null}
      <Typo
        text={`${props.description && allWords ? props.description : props.description.slice(0, 200)}`}
        // lines={6}
        style={{ marginBottom: RFValue(0), paddingHorizontal: RFValue(8) }}
        // size={16}
      >
        {!allWords ? (
          <Typo
            text=" Read more..."
            color="blue"
            onPress={() => {
              dispatch.Blogs.setField('activeBlog', blog);
              navigation.navigate('BlogProfile', blog);
            }}
            // size={12}
          />
        ) : null}
      </Typo>
      <LikeCommentShare {...props} />
    </View>
  );
};

export default React.memo(SingleBlog);
