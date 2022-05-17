import { View, Text, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import IconWithText from './IconWithText';
import DesignIcon from './DesignIcon';
import { BLACK, FIRESTORE, GRAY, WHITE } from '../Utils/Constants';
import { abbreviateNumber, keyGenerator, showAlert, sharePost } from '../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import RNShare from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Typo from './Typo';

const LikeCommentShare = (props) => {
  // console.log('PPOROSOSS---', props);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const [ state, setState ] = React.useState({ likes: [], comments: [] });
  const loading = useSelector((st) => st.loading.effects.Blogs);
  const { user } = useSelector((st) => st.Account);
  const {
    blogsActiveLike: activeLike,
    blogsActiveFavorite: activeFavorite,
    blogsActiveShare: activeShare
  } = useSelector((st) => st.General);
  const [ share, setShare ] = React.useState(false);

  const included = props.likes && props.likes.includes(user.uid);

  const includedFavorite = props.user && props.user.favorites && props.user.favorites.includes(postId);

  const postLike = () => {
    // dispatch.General.setField('activeLike', postId);
    // dispatch.Posts.postLike({
    //   uid: user.uid,
    //   postId: postId,
    //   payload: { likes: [ ...likes, user.uid ] },
    //   callback: (res) => {
    //     // console.log('RES FROM LIKE', res);
    //     if (!res.success) return showAlert('Something went wrong', res.result, 'danger');
    //     return showAlert(
    //       'Successfully liked post',
    //       'Successfully liked this item and it will now be in your liked posts',
    //       'success'
    //     );
    //   }
    // });
  };

  const favoritePost = () => {
    // dispatch.Posts.setField('activeFavorite', postId);
    // dispatch.Posts.favoritePost({
    //   uid: user.uid,
    //   postId: postId,
    //   payload: { favorites: [ ...favorites, postId ] },
    //   callback: (res) => {
    //     // console.log('RES FROM Favorites', res);
    //     if (!res.success) return showAlert('Something went wrong', res.result, 'danger');
    //     return showAlert(
    //       'Successfully favorited post',
    //       'Successfully favorited this item and it will now be in your favorites',
    //       'success'
    //     );
    //   }
    // });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: RFValue(10),
        height: RFValue(50),
        alignItems: 'center',
        backgroundColor: WHITE
        // borderWidth: 1
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[ { name: 'hearto', text: '20k' }, { name: 'ios-chatbubble-outline', text: '2k', pkg: 'io' } ].map((r) => (
          <View key={keyGenerator()} style={{ flexDirection: 'row', alignItems: 'center', marginRight: RFValue(15) }}>
            <DesignIcon name={r.name} pkg={r.pkg || 'ad'} extStyles={{ marginRight: RFValue(3) }} />
            <Typo text="20k" />
          </View>
        ))}
      </View>

      <View style={{ flexGrow: 1 }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {[
          // { name: 'ios-bookmark-outline', text: '2k', pkg: 'io' },
          {
            name: 'share-a',
            text: '20k',
            pkg: 'fot',
            onPress: () => sharePost(props, dispatch),
            color: activeShare
          }
          // { name: 'share-a', text: '20k', pkg: 'fot' },
        ].map((r, i) => (
          <View key={keyGenerator()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: RFValue(10) }}>
            <DesignIcon name={r.name} pkg={r.pkg || 'ad'} onPress={r.onPress} color={r.color ? GRAY : BLACK} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default LikeCommentShare;
