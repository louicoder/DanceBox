import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, ActivityIndicator } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentsLikeButtons, DesignIcon, LikeCommentShare, PostProfileCard, Typo } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { BROWN, GRAY, SHADOW, THEME_COLOR, WHITE } from '../../Utils/Constants';
import Image from 'react-native-fast-image';

const SingleBlog = (props) => {
  // console.log('POST::::', props);
  const [ shareLoading, setShareLoading ] = React.useState(false);

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

  const shareBlog = () => {
    setShareLoading(true);
    HelperFunctions.getsharableBase64((res) => {
      setShareLoading(false);
      console.log('Shareable base64', res);
    });
  };

  return (
    <View
      style={{
        marginBottom: RFValue(5),
        paddingVertical: RFValue(8),
        paddingBottom: props.last ? RFValue(70) : RFValue(8),
        backgroundColor: WHITE
      }}
    >
      <PostProfileCard {...props} {...props.user} />
      {props.imageUrl ? (
        <Image
          source={{ uri: props.imageUrl }}
          style={{ width: '100%', height: RFValue(200), marginBottom: RFValue(10) }}
        />
      ) : null}
      <Typo text={props.description} lines={6} style={{ marginBottom: RFValue(0), paddingHorizontal: RFValue(8) }} />
      <LikeCommentShare {...props} />

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          borderWidth: 0,
          paddingHorizontal: RFValue(8)
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: RFValue(3)
          }}
        >
          <Typo text="2k likes ・ 30k comments" color={GRAY} size={13} />
          <DesignIcon name="share" pkg="mc" size={30} />
        </View>
      </View> */}
    </View>
  );
};

export default React.memo(SingleBlog);
