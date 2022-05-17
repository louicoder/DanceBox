import { View, Text } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import DesignIcon from './DesignIcon';
import { GRAY, THEME_COLOR } from '../Utils/Constants';
import Typo from './Typo';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { devAlert } from '../Utils/HelperFunctions';

const PostProfileCard = (props) => {
  // console.log('IMAEGEE--', props.imageUrl);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(10),
        paddingHorizontal: RFValue(8)
      }}
    >
      <View style={{ width: RFValue(35), height: RFValue(35), marginRight: RFValue(10) }}>
        {props.imageUrl ? (
          <FastImage
            source={{ uri: props.imageUrl }}
            style={{ width: RFValue(35), height: RFValue(35), borderRadius: 50 }}
          />
        ) : (
          <DesignIcon name="user" pkg="ad" widthHeight={35} withBorder extStyles={{ marginRight: RFValue(10) }} />
        )}
      </View>

      <View style={{ flexGrow: 1 }}>
        <Typo text={props.name || props.username || props.email} size={13} style={{ fontWeight: 'bold' }} />

        <Typo text={moment(props.dateCreated).fromNow()} size={12} style={{ lineHeight: RFValue(15) }} color={GRAY} />
      </View>

      <Typo text="Follow" style={{}} color={THEME_COLOR} onPress={() => devAlert()} pressable />
    </View>
  );
};

export default React.memo(PostProfileCard);
