import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { useSelector } from 'react-redux';
import Styles from './Styles';

const Account = ({ navigation: { navigate } }) => {
  const { user } = useSelector((state) => state.Account);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingTop: RFValue(20) }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: RFValue(10),
            alignItems: 'center'
          }}
        >
          <ImageBackground
            source={{
              uri: user.imageUrl || CONSTANTS.DEFAULT_PROFILE
            }}
            resizeMode="cover"
            style={{ width: RFValue(80), height: RFValue(80), alignSelf: 'center', borderRadius: RFValue(200) }}
            imageStyle={{ borderRadius: RFValue(100) }}
          >
            <Pressable
              style={{
                borderRadius: RFValue(100),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.7)'
              }}
            >
              <Icon name="pencil" color="#fff" size={RFValue(40)} />
            </Pressable>
          </ImageBackground>
          <View
            style={{
              borderBottomColor: '#eee',
              flexGrow: 1,
              paddingLeft: RFValue(15)
            }}
          >
            <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>{user.name}</Text>
            <Pressable
              style={{
                borderWidth: 1,
                paddingVertical: RFValue(10),
                borderRadius: RFValue(3),
                width: '100%',
                borderColor: '#01020330',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: RFValue(10)
              }}
            >
              <Text style={{ fontSize: RFValue(16) }}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>

        {/* stats */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: RFValue(20)
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
                // borderLeftWidth: index === 1 ? 1 : 0,
                // borderRightWidth: index === 1 ? 1 : 0,
                paddingHorizontal: index === 1 ? RFValue(20) : 0,
                borderColor: '#aaa'
              }}
            >
              <Text style={{ fontSize: RFValue(18), fontWeight: 'bold' }}>{count}</Text>
              <Text style={{ fontSize: RFValue(14), color: '#aaa' }}>{title}</Text>
            </View>
          ))}
        </View>
        {/* End stats */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // height: RFValue(40),
            alignSelf: 'center',
            paddingHorizontal: RFValue(10),
            marginBottom: RFValue(10),
            width: '100%',
            borderBottomWidth: 1,
            paddingBottom: RFValue(20),
            borderBottomColor: '#eee'
          }}
        >
          <Pressable style={Styles.socials}>
            <Icon name="instagram" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="snapchat" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="facebook" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="twitter" size={RFValue(40)} />
          </Pressable>

          <Pressable style={Styles.socials}>
            <Icon name="youtube" size={RFValue(40)} />
          </Pressable>
        </View>

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
              { icon: 'comment-outline', title: 'All Reviews' },
              { icon: 'calendar-outline', title: 'All Events' },
              { icon: 'bookmark-outline', title: 'Favorites' }
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
            <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginVertical: RFValue(10) }}>
              Latest Reviews
            </Text>

            <FlatList
              style={{ marginVertical: RFValue(10) }}
              keyExtractor={() => HelperFunctions.keyGenerator()}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={reviews}
              renderItem={({ item: { email, review, dateCreated }, index }) => (
                <View
                  style={{
                    // borderWidth: 1,
                    width: RFValue(300),
                    // height: RFValue(100),
                    backgroundColor: '#eeeeee80',
                    padding: RFValue(10),
                    marginRight: RFValue(10)
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(10) }}>
                    <Image
                      style={{
                        width: RFValue(40),
                        height: RFValue(40),
                        borderRadius: RFValue(50),
                        borderWidth: 1,
                        borderColor: '#aaa'
                      }}
                    />
                    <View style={{ marginLeft: RFValue(10) }}>
                      <Text style={{ fontSize: RFValue(12), fontWeight: 'normal', color: '#000' }}>{email}</Text>
                      <Text style={{ fontSize: RFValue(10), color: '#aaa' }}>{dateCreated}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: RFValue(13) }}>{review}</Text>
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
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time '
  },
  {
    email: 'nekesa@gmail.com',
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time '
  },
  {
    email: 'trudy_fire@gmail.com',
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time '
  },
  {
    email: 'stuartkal@gmail.com',
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time '
  },
  {
    email: 'legendary20@gmail.com',
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time '
  },
  {
    email: 'mikey_tolls@gmail.com',
    dateCreated: '20 hours ago',
    review:
      'I have been really wondering what we could just have this comin weekened, I really liked the sessionswe had for chemotherapy laasat time'
  }
];
