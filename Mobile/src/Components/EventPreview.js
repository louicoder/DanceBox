import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS } from '../Utils';
import DesignIcon from './DesignIcon';

const EventPreview = ({ title, description, participating, attending, imageUrl, ...rest }) => {
  console.log('REST---', rest);
  return (
    <Pressable
      onPress={() => navigation.navigate('OrganiserProfile', { id })}
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: RFValue(8),
        paddingVertical: RFValue(10)
      }}
    >
      <Image source={{ uri: imageUrl || CONSTANTS.EVENTS_PIC }} style={{ width: RFValue(120), height: RFValue(120) }} />
      <View style={{ flexShrink: 1, paddingLeft: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>
          {title && title.slice(0, 20)}
          {title && title.length > 20 && '...'}
        </Text>
        {description && (
          <Text style={{ fontSize: RFValue(13), marginVertical: RFValue(5) }}>
            {description && description.slice(0, 150)}
            {description && description.length > 150 && '...'}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
            {/* <DesignIcon name="user-check" pkg="ft" />
            <DesignIcon name="share-a" pkg="fot" extStyles={{ marginLeft: RFValue(10) }} /> */}
          </View>
          <Text style={{ alignSelf: 'flex-end', fontSize: RFValue(14), color: '#aaa' }}>
            {participating && `${participating.length} participants `} ・ {attending && attending.length} going
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EventPreview;
