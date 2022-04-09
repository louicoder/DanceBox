import { View, Text } from 'react-native';
import React from 'react';
import { Buton, DesignIcon, Typo } from '../../Components';
import { RFValue } from 'react-native-responsive-fontsize';
import { GRAY, THEME_COLOR } from '../../Utils/Constants';

const Instructions = ({ createPost }) => {
  return (
    <View style={{ padding: RFValue(10) }}>
      <DesignIcon
        name="information-circle-outline"
        pkg="io"
        size={100}
        style={{ alignSelf: 'center', marginVertical: RFValue(20) }}
        color={GRAY}
      />
      <Typo size={16} text={`Please follow the instructions in order to keep this space safe for everyone\n `} />
      <Typo size={16} text="1. Do not use abuse and vulgar laguage in your post" />
      <Typo
        size={16}
        text={`2. Please keep your post straight to the point to avoid confusion and misunderstanding\n`}
      />
      <Typo
        size={16}
        text="Thanks for your cooperation on making sure we maintain a safe environment for each and everyone else"
      />
      <Buton title="Continue" extStyles={{ marginVertical: RFValue(10) }} onPress={createPost} />
    </View>
  );
};

export default Instructions;
