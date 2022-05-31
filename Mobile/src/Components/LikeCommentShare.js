import { View, Text, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import IconWithText from './IconWithText';
import DesignIcon from './DesignIcon';
import { BLACK, FIRESTORE, GRAY, THEME_COLOR, WHITE } from '../Utils/Constants';
import { abbreviateNumber, keyGenerator, showAlert, sharePost } from '../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import RNShare from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Typo from './Typo';
import { showMessage } from 'react-native-flash-message';

const LikeCommentShare = ({ extStyles = {}, _id: postId, ...props }) => {
  // console.log('PPOROSOSS---', props);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ likes: [], comments: [] });
  const [ shareLoading, setShareLoading ] = React.useState(false);
  const loading = useSelector((st) => st.loading.effects.Blogs);
  const { user } = useSelector((st) => st.Account);
  const { activeShare, activeLike, activeFavorite } = useSelector((st) => st.Blogs);
  // const { blogsActiveLike: activeLike, blogsActiveFavorite: activeFavorite } = useSelector((st) => st.General);
  const [ share, setShare ] = React.useState(false);

  const likeExists = user && props.likes && props.likes.includes(user.uid);

  const favoriteExists = user && user.favorites && user.favorites.includes(postId);

  const postLike = () => {
    dispatch.Blogs.setField('activeLike', postId);
    dispatch.Blogs.likeBlog({
      postId,
      callback: (res) => {
        // console.log('RES FROM LIKE', res);
        if (!res.success) return showAlert('Something went wrong', res.result, 'danger');

        // return showMessage({
        //   message: 'Successfully liked post',
        //   description: 'Successfully liked this item and it will now be in your liked posts',
        //   floating: true,
        //   backgroundColor: BLACK,
        //   textStyle: { color: WHITE },
        //   style: { backgroundColor: BLACK },
        //   position: 'top'
        // });
      }
    });
  };

  const favoriteBlog = () => {
    dispatch.Blogs.setField('activeFavorite', postId);
    let favorites = [];
    if (user.favorites) favorites = [ ...user.favorites, postId ];
    else favorites.push(postId);

    dispatch.Blogs.favoriteBlog({
      payload: { favorites },
      callback: (res) => {
        if (!res.success) return showAlert('Something went wrong', res.result, 'danger');
        return showMessage({
          message: 'Successfully favorited post',
          description: 'Successfully favorited this item and it will now be in your favorited posts',
          floating: true,
          backgroundColor: BLACK,
          textStyle: { color: WHITE },
          style: { backgroundColor: BLACK },
          position: 'top'
        });
      }
    });
  };

  const shareHandler = async () =>
    await sharePost({ ...props, _id: postId }, dispatch, (res) => {
      // setShareLoading(false);
      console.log('FRomsharing----', res);
    });

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: RFValue(10),
        height: RFValue(30),
        marginVertical: RFValue(10),
        marginTop: RFValue(15),
        alignItems: 'center',
        backgroundColor: WHITE,
        // borderWidth: 1,
        ...extStyles
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[
          {
            name: likeExists ? 'heart' : 'hearto',
            text: '20k',
            loading: activeLike === postId,
            onPress: () => (likeExists || activeLike === postId ? null : postLike()),
            pkg: 'ad'
          }
        ].map((r) => (
          <View key={keyGenerator()} style={{ flexDirection: 'row', alignItems: 'center', marginRight: RFValue(15) }}>
            <DesignIcon
              extStyles={{ marginRight: RFValue(10) }}
              size={23}
              // onPress={r.onPress}
              indicatorSize={20}
              color="#ff0831"
              {...r}
            />
            <Typo
              text={`${abbreviateNumber(props.likes && props.likes.length, 0)} • Likes`}
              color="#ff0831"
              size={13}
            />
          </View>
        ))}
      </View>

      <View style={{ flexGrow: 1 }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {[
          {
            name: 'bookmark-sharp',
            text: '2k',
            pkg: 'io',
            size: 25,
            loading: activeFavorite === postId,
            color: '#010203',
            onPress: () => (activeFavorite === postId ? null : favoriteBlog()),
            visible: !favoriteExists
          },
          {
            name: 'share',
            text: '20k',
            pkg: 'mt',
            onPress: () => (activeShare === postId ? null : shareHandler()),
            loading: activeShare === postId,
            size: 25,
            color: '#010203',
            visible: true
          }
          // { name: 'share-a', text: '20k', pkg: 'fot' },
        ].map((r, i) => (
          <View key={keyGenerator()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: RFValue(15) }}>
            {r.visible ? (
              <DesignIcon
                // name={r.name}
                // pkg={r.pkg || 'ad'}
                // onPress={() => (r.loading ? null : r.onPress())}
                color={r.loading ? GRAY : r.color}
                indicatorSize={22}
                // indicatorColor="#aaa"
                // size={20}
                {...r}
              />
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(LikeCommentShare);
