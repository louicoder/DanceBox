import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS } from '../Utils';
import DesignIcon from './DesignIcon';
import { Typo } from '.';
import Image from 'react-native-fast-image';
import Event from '../assets/event.jpg';
import { HALF_WHITE, PURPLE, QUARTER_WHITE, SHADOW, THEME_COLOR, WHITE, WIDTH } from '../Utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { devAlert, showAlert } from '../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

const EventPreview = ({
  navigation,
  imageUrl,
  onPress = true,
  borderRadius = true,
  extStyles,
  title,
  eventInterval,
  event,
  eventDate,
  description,
  ...rest
}) => {
  const loading = useSelector((st) => st.loading.effects.Events);
  const { updatingEventId } = useSelector((st) => st.Events);
  const { user } = useSelector((st) => st.Account);
  const dispatch = useDispatch();

  const followEvent = () => {
    dispatch.Events.setField('updatingEventId', rest._id);
    dispatch.Events.followEvent({
      eventId: rest._id,
      userId: user.uid,
      callback: (res) => {
        if (!res.success) return showAlert('Something went wrong', res.result);
      }
    });
  };

  return (
    <Pressable
      onPress={() => {
        if (!onPress) return;
        dispatch.Events.setField('activeEvent', event);
        return navigation.navigate('EventProfile', event);
      }}
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: RFValue(20),
        backgroundColor: WHITE,
        // paddingHorizontal: RFValue(8),
        borderRadius: RFValue(10),
        ...SHADOW,
        elevation: RFValue(10),
        shadowColor: '#000',
        // paddingVertical: RFValue(10),
        alignItems: 'center',
        height: WIDTH / 1.5,
        zIndex: -10,
        ...extStyles
      }}
    >
      {/* <View style={{ width: 0.18 * WIDTH, height: 0.18 * WIDTH, borderRadius: RFValue(8) }}> */}
      <Image
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%', borderRadius: borderRadius ? RFValue(10) : 0 }}
      />
      {rest.followers && !rest.followers.includes(user.uid) ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 10,
            backgroundColor: '#00000070',
            justifyContent: 'flex-end',
            padding: RFValue(10),
            borderRadius: borderRadius ? RFValue(10) : 0
          }}
        >
          <Pressable
            onPress={followEvent}
            text="Follow"
            style={{
              backgroundColor: '#6B6ADE',
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(5),
              borderRadius: borderRadius ? RFValue(10) : 0,
              // borderRadius: RFValue(10),
              position: 'absolute',
              top: RFValue(15),
              zIndex: 50,
              right: RFValue(15)
            }}
          >
            {!loading.updateEvent && updatingEventId === rest._id ? (
              <ActivityIndicator />
            ) : (
              <Typo text="+ Follow" color={WHITE} onPress={followEvent} />
            )}
          </Pressable>
        </View>
      ) : null}
      <LinearGradient
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: RFValue(10),
          justifyContent: 'flex-end',
          borderBottomRightRadius: borderRadius ? RFValue(10) : 0,
          borderBottomLeftRadius: borderRadius ? RFValue(10) : 0,
          // borderRadius: borderRadius ? RFValue(10) : 0,

          height: '60%',
          width: '100%',
          borderColor: WHITE,
          // borderWidth: 1,
          zIndex: 40
        }}
        colors={[ 'transparent', '#00000080', '#000000', '#000000' ]}
      >
        {/* <Typo text={title} color={WHITE} size={20} style={{ fontWeight: 'bold' }} /> */}
        <Typo text={`${title}`} color={WHITE} size={18} style={{ fontWeight: 'normal' }} />
        <Typo
          text={`🗒 ${moment(eventDate).format('dddd, Do-MMM-YYYY')}`}
          color={WHITE}
          size={12}
          style={{ fontWeight: 'normal', marginVertical: RFValue(2) }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typo
            text={`Location: ${rest.location || 'No location specified'}`}
            color={QUARTER_WHITE}
            size={12}
            style={{ flexWrap: 'wrap', flexShrink: 1, marginRight: RFValue(10) }}
          />
          <Typo
            text={`${eventInterval === 'once' ? 'One Time' : eventInterval} Event`}
            color={WHITE}
            size={10}
            style={{
              fontWeight: 'normal',
              padding: RFValue(5),
              paddingHorizontal: RFValue(10),
              // backgroundColor: PURPLE,
              // backgroundColor: PURPLE,
              backgroundColor: '#2D8928',
              alignSelf: 'flex-start',
              borderRadius: RFValue(50)
              // width: '40%'
            }}
            lines={2}
          />
        </View>
        <View />
      </LinearGradient>
    </Pressable>
  );
};

export default React.memo(EventPreview);
