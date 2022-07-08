import { View, Pressable } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Buton, DesignIcon, Typo } from '../../Components';
import { DARK_BLUE, DARK_GREEN, LIGHT_BLUE, LIGHT_GREEN, THEME_COLOR, WIDTH } from '../../Utils/Constants';
import { keyGenerator } from '../../Utils/HelperFunctions';

const Selection = ({ navigation }) => {
  return (
    <View style={{ paddingHorizontal: RFValue(10), marginBottom: RFValue(15) }}>
      <Typo text="Select a quick action:" style={{ fontWeight: 'bold', marginBottom: RFValue(15) }} size={16} />
      {[
        {
          title: 'Create an event',
          caption: 'Organising an event? share the event details with the community for more visibility and for FREE!',
          buttonColor: LIGHT_BLUE,
          textColor: DARK_BLUE,
          butonText: '+ Create Event',
          name: 'calendar',
          size: 50,
          pkg: 'sim',
          onPress: () => navigation.navigate('NewEvent')
        },
        {
          title: 'Create a post',
          caption: 'What do you feel like sharing?  News, Plot, Directions, Encouragement? Let it all out!',
          buttonColor: `${DARK_GREEN}20`,
          textColor: 'green',
          butonText: '+ Create Post',
          name: 'microphone',
          size: 50,
          pkg: 'sim',
          onPress: () => navigation.navigate('NewBlog')
        }
      ].map((r, i) => (
        <Pressable
          key={keyGenerator()}
          onPress={r.onPress}
          style={{
            flexDirection: 'row',
            backgroundColor: r.buttonColor,
            borderWidth: 0.8,
            borderColor: r.textColor,
            paddingHorizontal: RFValue(10),
            paddingVertical: RFValue(15),
            marginBottom: RFValue(15),
            borderRadius: RFValue(10)
          }}
        >
          <View style={{ marginHorizontal: RFValue(10) }}>
            <DesignIcon {...r} color={THEME_COLOR} />
          </View>
          <View style={{ flexShrink: 1, borderWidth: 0 }}>
            <Typo text={r.title} size={18} style={{ fontWeight: 'bold' }} />
            <Typo text={r.caption} size={13} style={{ marginVertical: RFValue(8), lineHeight: RFValue(15) }} />
            {/* <Buton
              // title={r.butonText}
              title="Get started"
              onPress={r.onPress}
              extStyles={{
                width: 0.4 * WIDTH + RFValue(10),
                // alignSelf: 'flex-end',
                paddingHorizontal: RFValue(10),
                borderRadius: RFValue(100),
                height: RFValue(35),
                borderWidth: 1,
                borderColor: '#aaa',
                // backgroundColor: r.buttonColor,
                backgroundColor: 'transparent',
                marginTop: RFValue(i === 0 ? 0 : 0)
              }}
              textStyles={{ fontSize: RFValue(14), color: r.textColor }}
            /> */}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default Selection;
