import { View, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import DesignIcon from './DesignIcon';
import Typo from './Typo';
import { abbreviateNumber, keyGenerator, showAlert } from '../Utils/HelperFunctions';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME_COLOR5, THEME_COLOR6, THEME_COLOR7 } from '../Utils/Constants';
import moment from 'moment';

const Comments = ({ style = {}, postId, navigation }) => {
  const { comments, commentsPagination: { totalDocuments } } = useSelector((st) => st.General);
  const { user } = useSelector((st) => st.Account);
  const { activeCommentLike } = useSelector((st) => st.General);
  const loading = useSelector((st) => st.loading.effects);
  const dispatch = useDispatch();

  // React.useEffect(
  //   () => {
  //     // dispatch.General.setField('comments', []);
  //     // getPostComments();
  //   },
  //   [ navigation, postId ]
  // );

  // console.log('USER', postId);
  const postComment = () => {
    let payload = { postId, authorId: user.uid };
    dispatch.General.postComment({
      payload,
      callback: (res) => {
        // console.log('Here after posting comment', res.result);
      }
    });
  };

  const getPostComments = () =>
    dispatch.General.getPostComments({
      postId,
      callback: (res) => {
        // console.log('Got comments', res.result);
        if (!res.success) return showAlert('Failed to get comments', res.result);
      }
    });

  const likeComment = (postId) => {
    dispatch.General.setField('activeCommentLike', postId);
    dispatch.General.likePostComment({
      userId: user.uid,
      postId,
      callback: (res) => {
        // console.log('From likign comment', res);
      }
    });
  };

  // console.log('DIspatch', dispatch.General);
  // const
  return (
    <View
      style={{
        marginHorizontal: RFValue(5),
        marginVertical: RFValue(20),
        paddingVertical: RFValue(20),
        borderTopWidth: 1,
        borderColor: '#eee',
        ...style
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(20) }}>
        <Typo
          text={`${abbreviateNumber(totalDocuments, 1)}`}
          style={{
            fontWeight: 'bold',
            // backgroundColor: '#eee',
            backgroundColor: THEME_COLOR5,
            paddingVertical: RFValue(3),
            paddingHorizontal: RFValue(10),
            borderRadius: RFValue(5)
          }}
          size={16}
          color={THEME_COLOR6}
        />
        <Typo text=" • Comments on this post:" size={16} style={{ fontWeight: 'bold' }} />
      </View>
      {comments &&
        comments.map((r) => {
          const isLoading = activeCommentLike === r._id && loading.General.likePostComment;
          const same = activeCommentLike === r._id;
          const exists = r.likes && r.likes.includes(user.uid);
          return (
            <View
              key={keyGenerator()}
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: RFValue(15) }}
            >
              <View style={{ marginLeft: RFValue(15) }}>
                {r.user && r.user.imageUrl ? (
                  <FastImage
                    source={{ uri: r.user.imageUrl }}
                    style={{ width: RFValue(30), height: RFValue(30), borderRadius: 50 }}
                  />
                ) : (
                  <DesignIcon name="user" pkg="ad" withBorder widthHeight={30} style={{}} size={20} color="#aaa" />
                )}
              </View>
              <View
                style={{
                  width: '85%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  // marginLeft: RFValue(10),
                  padding: RFValue(15),
                  // backgroundColor: '#eeeeee',
                  borderRadius: RFValue(25),
                  paddingTop: 0
                }}
              >
                <View style={{ width: '90%', borderWidth: 0 }}>
                  <View
                    style={{
                      backgroundColor: '#eeeeee90',
                      padding: RFValue(10),
                      borderRadius: RFValue(15),
                      marginBottom: RFValue(3)
                    }}
                  >
                    <Typo text={r.user && (r.user.username || r.user.email)} size={13} style={{ fontWeight: 'bold' }} />
                    <Typo text={r.comment} size={12} style={{ marginVertical: RFValue(0) }} />
                  </View>
                  <Typo
                    text={`${r.likes && abbreviateNumber(r.likes.length, 1)} Likes  •  ${moment
                      .utc(r.dateCreated)
                      .fromNow()}`}
                    color="#aaa"
                    size={12}
                    style={{ marginLeft: RFValue(10) }}
                  />
                </View>
                <Pressable
                  style={{ width: '10%', borderWidth: 0, alignItems: 'flex-end', paddingTop: RFValue(20) }}
                  onPress={() => (exists ? null : likeComment(r._id))}
                >
                  {isLoading ? (
                    <ActivityIndicator color="red" size={RFValue(16)} />
                  ) : (
                    <DesignIcon
                      name={exists ? 'heart' : 'hearto'}
                      size={18}
                      onPress={() => (exists ? null : likeComment(r._id))}
                      color="red"
                    />
                  )}
                </Pressable>
                {/* <Typo text={moment(r.dateCreated).utc(true).format('DD-MM-YYYY hh:mm')} /> */}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default React.memo(Comments);
