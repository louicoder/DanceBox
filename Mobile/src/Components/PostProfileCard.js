import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import DesignIcon from './DesignIcon';
import { BLACK, GRAY, THEME_COLOR, WHITE } from '../Utils/Constants';
import Typo from './Typo';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { devAlert, showAlert } from '../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const PostProfileCard = (props) => {
  // console.log('IMAEGEE--', props.imageUrl);
  const { user, activeFollowing } = useSelector((st) => st.Account);
  const dispatch = useDispatch();
  // console.log('USER', props.authorId, user.uid);

  const alreadyFollowed = user && user.following && user.following.includes(props.authorId);

  const followAccount = () => {
    dispatch.Blogs.setField('activeFollowing', props._id);
    let following = [];
    if (user.following) following = [ ...user.following, props.authorId ];
    else following.push(props.authorId);

    dispatch.Account.followAccount({
      following,
      callback: (res) => {
        if (!res.success) return showAlert('Something went wrong', res.result, 'danger');
        return showMessage({
          message: 'Successfully favorited post',
          description: 'Successfully favorited this item and it will now be in your favorited posts',
          floating: true,
          // backgroundColor: BLACK,
          textStyle: { color: WHITE },
          style: { backgroundColor: BLACK },
          position: 'top',
          type: 'sucess'
        });
      }
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(10),
        paddingHorizontal: RFValue(8)
      }}
    >
      <View style={{ width: RFValue(30), height: RFValue(30), marginRight: RFValue(10) }}>
        {props.imageUrl ? (
          <FastImage
            source={{ uri: props.imageUrl }}
            style={{ width: RFValue(30), height: RFValue(30), borderRadius: 50 }}
          />
        ) : (
          <DesignIcon
            name="user"
            pkg="ad"
            widthHeight={30}
            withBorder
            extStyles={{ marginRight: RFValue(10) }}
            size={20}
            color={GRAY}
          />
        )}
      </View>

      <View style={{ flexGrow: 1 }}>
        <Typo
          text={props.user && (props.user.name || props.user.username || props.user.email)}
          size={16}
          style={{ fontWeight: 'bold' }}
        />

        <Typo
          text={`Created • ${moment(props.dateCreated).fromNow()}`}
          size={12}
          style={{ lineHeight: RFValue(15) }}
          color="#ffb57d"
        />
      </View>

      {/* {user && user.uid !== props.authorId && !alreadyFollowed ? activeFollowing === props._id ? (
        <ActivityIndicator animating color={BLACK} />
      ) : (
        <Typo text="+ Follow" style={{}} onPress={followAccount} pressable color="#682a92" size={14} />
      ) : null} */}
    </View>
  );
};

export default React.memo(PostProfileCard);
