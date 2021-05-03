import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Input from '../../Components/Input';

const SinglePost = ({ imageUrl, ...props }) => {
  // console.log('Image url', props.route.params);
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header {...props} title="Details" />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#eee',
            height: RFValue(60),
            position: 'absolute',
            bottom: 0,
            zIndex: 40,
            alignItems: 'center'
          }}
        >
          <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{
                uri:
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              }}
              style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(50) }}
            />
          </View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#aaa',
              width: '75%',
              height: RFValue(40),
              paddingHorizontal: RFValue(10),
              fontSize: RFValue(14)
            }}
            placeholder="Enter your comment here"
          />
          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="chevron-right" size={RFValue(30)} />
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: props.route.params.post.img }}
              style={{ width: '100%', height: RFValue(300) }}
              resizeMode="cover"
            />
            <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingVertical: RFValue(10) }}>
              <View style={{ flexDirection: 'row', flexGrow: 1 }}>
                <Icon name="heart-outline" size={RFValue(25)} />
                <Icon name="chatbubble-outline" size={RFValue(25)} style={{ marginHorizontal: RFValue(10) }} />
                <MaterialCommunityIcons name="share" size={RFValue(25)} />
              </View>
              <Icon name="bookmark-outline" size={RFValue(25)} style={{ alignSelf: 'flex-end' }} />
            </View>
            <View style={{ marginTop: RFValue(10), paddingHorizontal: RFValue(10) }}>
              {[ ...Array(10) ].map((item, index) => (
                <View
                  style={{
                    width: '100%',
                    marginBottom: index === 9 ? RFValue(64) : RFValue(20),
                    flexDirection: 'row'
                  }}
                >
                  <View style={{ width: '20%' }}>
                    <Image
                      source={{
                        uri:
                          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                      }}
                      style={{ width: RFValue(50), height: RFValue(50), borderRadius: RFValue(100) }}
                    />
                  </View>
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontWeight: 'bold' }}>Username</Text>
                    <Text style={{ paddingVertical: RFValue(5) }}>
                      This is the sample comment on this post that we cannot wait to have the way to come from the right
                      {index % 2 === 0 &&
                        'directions on the map of uganda, something we can allow with the people of Africa who cannot play around'}
                    </Text>
                    <Text style={{ color: '#aaa' }}>20 hours ago</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SinglePost;
