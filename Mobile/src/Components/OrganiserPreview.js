import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CONSTANTS } from '../Utils';
import DesignIcon from './DesignIcon';

const OrganiserPreview = ({ navigation }) => {
  return (
    <Pressable
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: RFValue(8),
        paddingVertical: RFValue(10)
      }}
    >
      <Image source={{ uri: CONSTANTS.EVENTS_PIC }} style={{ width: RFValue(120), height: RFValue(120) }} />
      <View style={{ flexShrink: 1, paddingLeft: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>Company name here</Text>
        <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Primum divisit ineleganter; Frater et T. Non autem
          hoc: igitur ne illud quidem.{' '}
        </Text>
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
            <DesignIcon name="user-check" pkg="ft" />
            <DesignIcon name="share-a" pkg="fot" extStyles={{ marginLeft: RFValue(10) }} />
            {/* <DesignIcon name="bookmark" pkg="ft" /> */}
          </View>
          <Text style={{ alignSelf: 'flex-end', fontSize: RFValue(16), color: '#aaa' }}>20 followers</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default OrganiserPreview;
