import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Typo } from '.';
import { BLACK, BROWN, WHITE } from '../Utils/Constants';
import { keyGenerator } from '../Utils/HelperFunctions';

const ScrollBubbles = ({ selected = '', onPress, options, extStyles }) => {
  return (
    <View style={{ marginVertical: RFValue(10), ...extStyles }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options &&
          options.map((r, i) => (
            <Pressable
              key={keyGenerator()}
              style={{
                paddingHorizontal: RFValue(10),
                height: RFValue(30),
                justifyContent: 'center',
                backgroundColor: selected === r ? BLACK : BROWN,
                borderRadius: 50,
                marginRight: RFValue(10),
                marginLeft: i === 0 ? RFValue(8) : 0
              }}
              onPress={() => onPress(r)}
            >
              <Typo
                text={r}
                size={11.5}
                color={selected === r ? WHITE : BLACK}
                style={{ textTransform: 'capitalize' }}
              />
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export default ScrollBubbles;
