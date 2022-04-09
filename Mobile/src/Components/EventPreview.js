import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS } from '../Utils';
import DesignIcon from './DesignIcon';
import { Typo } from '.';
import Image from 'react-native-fast-image';
import Event from '../assets/event.jpg';
import { HALF_WHITE, QUARTER_WHITE, SHADOW, WHITE, WIDTH } from '../Utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const EventPreview = ({ navigation, imageUrl, onPress, borderRadius = true, extStyles }) => {
  // console.log('REST---', rest);
  return (
    <Pressable
      onPress={() => (onPress ? onPress : navigation.navigate('EventProfile', {}))}
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: RFValue(20),
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
        {/* <Pressable
          onPress={() => null}
          text="Follow"
          style={{
            backgroundColor: '#6B6ADE',
            paddingHorizontal: RFValue(10),
            paddingVertical: RFValue(5),
            borderRadius: RFValue(10),
            position: 'absolute',
            top: RFValue(15),
            zIndex: 50,
            right: RFValue(15)
          }}
        >
          <Typo text="+ Follow" color={WHITE} />
        </Pressable> */}
      </View>
      <LinearGradient
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: RFValue(10),
          justifyContent: 'flex-end',
          borderBottomRightRadius: RFValue(10),
          borderBottomLeftRadius: RFValue(10),
          height: '60%',
          width: '100%',
          borderColor: WHITE,
          // borderWidth: 1,
          zIndex: 40
        }}
        colors={[ 'transparent', '#00000080', '#000000', '#000000' ]}
      >
        <Typo text="The BReakout Competition" color={WHITE} size={20} style={{ fontWeight: 'bold' }} />
        <Typo text="📍 Geaorge street ・ 10pm ・ 23 Feb 2022" color={WHITE} size={14} style={{ fontWeight: 'normal' }} />
        <Typo text="240k following ・ 50 comments" color={QUARTER_WHITE} size={14} style={{ fontWeight: 'normal' }} />
      </LinearGradient>
    </Pressable>
  );
};

export default React.memo(EventPreview);
