import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import DesignIcon from './DesignIcon';
import Typo from './Typo';
import { abbreviateNumber, keyGenerator, showAlert } from '../Utils/HelperFunctions';
import { RFValue } from 'react-native-responsive-fontsize';
import { THEME_COLOR5 } from '../Utils/Constants';
import moment from 'moment';

const Comments = ({ style = {}, postId, navigation }) => {
  const { comments, commentsPagination: { totalDocuments } } = useSelector((st) => st.General);
  const { user } = useSelector((st) => st.Account);
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

  // const
  return (
    <View
      style={{
        marginHorizontal: RFValue(8),
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
            paddingHorizontal: RFValue(8),
            borderRadius: 50
          }}
          size={16}
        />
        <Typo text=" • Comments on this post:" size={16} style={{ fontWeight: 'bold' }} />
      </View>
      {comments &&
        comments.map((r) => (
          <View
            key={keyGenerator()}
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: RFValue(15) }}
          >
            <View style={{ marginLeft: RFValue(15) }}>
              {/* <FastImage /> */}
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
                // marginLeft: RFValue(10),
                padding: RFValue(15),
                // backgroundColor: '#eeeeee',
                borderRadius: RFValue(25),
                paddingTop: 0
              }}
            >
              <Typo text={r.user && (r.user.username || r.user.email)} size={13} style={{ fontWeight: 'bold' }} />
              <Typo text={r.comment} size={12} style={{ marginVertical: RFValue(5) }} />
              <Typo text={moment.utc(r.dateCreated).fromNow()} color="#aaa" size={10} />
              {/* <Typo text={moment(r.dateCreated).utc(true).format('DD-MM-YYYY hh:mm')} /> */}
            </View>
          </View>
        ))}
    </View>
  );
};

export default Comments;
