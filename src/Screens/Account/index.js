import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components';
import { HelperFunctions } from '../../Utils';

const Account = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: '100%', height: RFValue(220), justifyContent: 'center' }}>
          <ImageBackground
            source={{
              uri: 'https://www.goplacesdigital.com/wp-content/uploads/2020/06/IMG-20200618-WA0013.jpg'
            }}
            resizeMode="cover"
            style={{ width: RFValue(150), height: RFValue(150), alignSelf: 'center', borderRadius: RFValue(200) }}
            imageStyle={{ borderRadius: RFValue(100) }}
          >
            <Pressable
              style={{
                borderRadius: RFValue(100),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.4)'
              }}
            >
              <Text style={{ color: '#fff', fontSize: RFValue(16) }}>Edit Photo</Text>
              <Icon name="pencil" color="#fff" size={RFValue(30)} />
            </Pressable>
          </ImageBackground>
          <View
            style={{
              paddingTop: RFValue(15),
              alignItems: 'center',
              // borderBottomWidth: RFValue(1),
              borderBottomColor: '#eee'
            }}
          >
            <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>@Bboy Energy</Text>
            {/* <Text style={{ fontSize: RFValue(14) }}>mars_345tre@gmail.com</Text> */}
          </View>
        </View>

        {/* stats */}
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: RFValue(20)
          }}
        >
          {[
            { title: 'Followers', count: '2k' },
            { title: 'Following', count: '100' },
            { title: 'Reviews', count: '28' }
          ].map(({ title, count }, index) => (
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: index === 1 ? RFValue(15) : 0,
                borderLeftWidth: index === 1 ? 1 : 0,
                borderRightWidth: index === 1 ? 1 : 0,
                paddingHorizontal: index === 1 ? RFValue(20) : 0,
                borderColor: '#aaa'
              }}
            >
              <Text style={{ fontSize: RFValue(18), fontWeight: '700' }}>{count}</Text>
              <Text style={{ fontSize: RFValue(16), color: '#aaa' }}>{title}</Text>
            </View>
          ))}
        </View>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: RFValue(40), alignSelf: 'center' }}
        >
          <Ripple
            style={{
              borderWidth: 1,
              paddingHorizontal: RFValue(10),
              borderRadius: RFValue(3),
              // width: RFValue(40),
              borderColor: '#aaa',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: RFValue(16) }}>Edit Profile</Text>
          </Ripple>

          <Ripple
            style={{
              borderWidth: 1,
              marginHorizontal: RFValue(10),
              width: RFValue(40),
              borderRadius: RFValue(3),
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#aaa'
            }}
          >
            <Icon name="instagram" size={RFValue(30)} />
          </Ripple>

          <Ripple
            style={{
              borderWidth: 1,
              marginHorizontal: RFValue(10),
              marginLeft: RFValue(0),
              width: RFValue(40),
              borderRadius: RFValue(3),
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#aaa'
            }}
          >
            <Icon name="facebook" size={RFValue(30)} />
          </Ripple>

          <Ripple
            style={{
              borderWidth: 1,
              width: RFValue(40),
              borderRadius: RFValue(3),
              borderColor: '#aaa',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="youtube" size={RFValue(30)} />
          </Ripple>
        </View>
        <Ripple
          style={{ width: '95%', alignSelf: 'center', marginVertical: RFValue(10) }}
          onPress={() => navigate('FinishRegistration')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#eeeeee75',
              padding: RFValue(15)
            }}
          >
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>Finish your registration - 90%</Text>
            <Icon name="arrow-right" size={RFValue(20)} />
          </View>
          <View style={{ width: '100%', backgroundColor: '#ddd', height: RFValue(5) }}>
            <View style={{ backgroundColor: '#000', width: '90%', position: 'absolute', height: '100%' }} />
          </View>
        </Ripple>

        <View style={{ paddingHorizontal: RFValue(10) }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: RFValue(10)
            }}
          >
            {[
              { icon: 'comment-edit', title: 'Reviews' },
              { icon: 'bookmark', title: 'Favorites' },
              { icon: 'calendar', title: 'Events' }
            ].map(({ title, icon }) => (
              <Ripple
                style={{
                  width: '32%',
                  backgroundColor: '#eee',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: RFValue(10),
                  borderRadius: RFValue(5)
                }}
              >
                <Icon name={icon} size={RFValue(40)} />
                <Text>{title}</Text>
              </Ripple>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold' }}>Latest Reviews</Text>

            <FlatList
              style={{ marginVertical: RFValue(10) }}
              keyExtractor={() => HelperFunctions.keyGenerator()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={reviews}
              renderItem={({ item: { email, review }, index }) => (
                <View
                  style={{
                    // borderWidth: 1,
                    width: RFValue(300),
                    // height: RFValue(100),
                    backgroundColor: '#eee',
                    padding: RFValue(10),
                    marginRight: RFValue(10)
                  }}
                >
                  <Text
                    style={{ fontSize: RFValue(12), fontWeight: 'bold', marginBottom: RFValue(10), color: '#00000095' }}
                  >
                    {email}
                  </Text>
                  <Text style={{ fontSize: RFValue(14) }}>{review}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const reviews = [
  {
    email: 'musanje2010@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessions we had for breakdance last time'
  },
  {
    email: 'nekesa@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  },
  {
    email: 'trudy_fire@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  },
  {
    email: 'stuartkal@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  },
  {
    email: 'legendary20@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  },
  {
    email: 'mikey_tolls@gmail.com',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  }
];
